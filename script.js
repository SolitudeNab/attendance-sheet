async function validate() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    const errorMessage = "សូមបញ្ចូលអត្តលេខសិស្ស និងលេខសម្ងាត់";
    document.getElementById("error-message").textContent = errorMessage;
  } else {
    // Fetch users.csv
    try {
      const response = await fetch("users.csv");
      const csvText = await response.text();

      const userCredentials = csvText
        .split("\n")
        .filter(line => line.trim() !== "")
        .map(line => {
          const [username, password, url] = line.split(",");
          return { username, password, url };
        });

      const user = userCredentials.find(user => user.username === username && user.password === password);

      if (user) {
        // Store the user credentials in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        window.location.href = user.url;
      } else {
        const errorMessage = "អត្តលេខសិស្ស ឬលេខសម្ងាត់មិនត្រឹមត្រូវ";
        document.getElementById("error-message").textContent = errorMessage;
      }
    } catch (error) {
      console.error("Failed to load user credentials:", error);
      const errorMessage = "Failed to load user credentials";
      document.getElementById("error-message").textContent = errorMessage;
    }
  }
}
// Login Automatically
window.onload = () => {
  const userString = localStorage.getItem("user");

  if (userString) {
    try {
      const user = JSON.parse(userString);

      window.location.href = user.url;
    } catch (error) {
      console.error("Failed to parse stored user credentials:", error);
    }
  }
};
localStorage.clear();
