export let baseUrl = "http://localhost:4000";

if (import.meta.env.MODE === "development") {
  baseUrl = "https://apiv2.k33Street.com";
} else {
  baseUrl = "http://localhost:4000";
}
