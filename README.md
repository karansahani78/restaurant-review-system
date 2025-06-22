# 🌟 **Restaurant Review System API** 🍽️

> A modern, well-structured **Spring Boot REST API** to manage Restaurants, Users, Reviews, and Categories — perfect for real-world use cases, portfolio, or production systems.

---

## 🚀 **Tech Stack & Tools**

| 💻 Layer   | 🔧 Technologies                               |
| ---------- | --------------------------------------------- |
| Language   | `Java 17`                                     |
| Framework  | `Spring Boot`, `Spring Data JPA`, `Hibernate` |
| Database   | `PostgreSQL` / `MySQL`                        |
| Caching    | `Redis`                                       |
| Build Tool | `Maven`                                       |
| API Docs   | `Swagger UI`, `Springdoc OpenAPI`             |
| Utility    | `Lombok`, `MapStruct`                         |
```

---

## ⚙️ **Getting Started**

### ✅ Prerequisites

* Java 17+
* Maven 3.6+
* PostgreSQL or MySQL

### 🛠️ Setup

```bash
git clone https://github.com/karansahani78/restaurant-review-system.git
cd restaurant-review-system
```

Update `application.yml` with DB details:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/restaurantdb
    username: postgres
    password: yourpassword
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

### ▶️ Run the App

```bash
mvn spring-boot:run
```

🧪 Access Swagger UI:

```
http://localhost:8080/swagger-ui/index.html
```

---

## ✨ **Features**

✅ Full CRUD APIs for all entities
✅ Structured DTOs & Validation
✅ Swagger-powered live documentation
✅ Dynamic restaurant timings using list/map
🔒 JWT Authentication (coming soon)

---

## 📚 **API Endpoints**

### 👤 **User Controller** (`/api/v1/users`)

| Method   | Endpoint          | Description         |
| -------- | ----------------- | ------------------- |
| `POST`   | `/admin/register` | Register admin/user |
| `GET`    | `/`               | Get all users       |
| `GET`    | `/{id}`           | Get user by ID      |
| `PUT`    | `/{id}`           | Update user         |
| `DELETE` | `/{id}`           | Delete user         |

### 🏨 **Restaurant Controller** (`/api/v1/restaurants`)

| Method   | Endpoint            | Description                   |
| -------- | ------------------- | ----------------------------- |
| `POST`   | `/add/{categoryId}` | Add restaurant under category |
| `GET`    | `/`                 | Get all restaurants           |
| `GET`    | `/{id}`             | Get restaurant by ID          |
| `PUT`    | `/{id}`             | Update restaurant             |
| `DELETE` | `/{id}`             | Delete restaurant             |

### ✍️ **Review Controller** (`/api/reviews`)

| Method   | Endpoint | Description      |
| -------- | -------- | ---------------- |
| `POST`   | `/add`   | Add new review   |
| `GET`    | `/`      | Get all reviews  |
| `GET`    | `/{id}`  | Get review by ID |
| `PUT`    | `/{id}`  | Update review    |
| `DELETE` | `/{id}`  | Delete review    |

### 📁 **Category Controller** (`/api/v1/categories`)

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| `POST` | `/add`         | Add new category     |
| `GET`  | `/`            | Get all categories   |
| `GET`  | `/{id}`        | Get category by ID   |
| `GET`  | `/name/{name}` | Get category by name |

---

## 🧾 **Sample Responses**

### ✅ Register User

```json
{
  "id": 1,
  "name": "Karan",
  "email": "karan@example.com",
  "role": "USER"
}
```

### ✅ Get All Restaurants

```json
[
  {
    "id": 3,
    "name": "The Gourmet Spot",
    "description": "Fusion dining",
    "category": { "id": 1, "name": "Fusion" },
    "openingHours": [
      { "day": "MONDAY", "openTime": "09:00 AM", "closeTime": "10:00 PM" }
    ]
  }
]
```

### ✅ Get All Reviews

```json
[
  {
    "id": 1,
    "rating": 5,
    "comment": "Amazing food!",
    "createdAt": "2025-06-14T19:08:19"
  }
]
```

---

## 🧠 **Entity Models**

### 👤 User

```json
{
  "id": 1,
  "name": "Karan",
  "email": "karan@example.com",
  "role": "USER",
  "reviews": []
}
```
Get All Users – API Response
![Get all user Api response](https://github.com/user-attachments/assets/c12b31ea-53d7-4fe4-85a5-2fc49e823250)



### 🏨 Restaurant

```json
{
  "id": 5,
  "name": "La Pasta Bella",
  "category": { "id": 2, "name": "Italian" },
  "openingHours": [...],
  "reviews": [...]
}
```
Get All Restaurants – API Response
![get all restaurant api response](https://github.com/user-attachments/assets/d3b81e6e-35c8-4fbe-a9ec-8e069ad81218)


### ✍️ Review

```json
{
  "id": 2,
  "rating": 4,
  "comment": "Lovely service!",
  "restaurantId": 5,
  "userId": 1
}
```
Get All Reviews – API Response
![get all review api response](https://github.com/user-attachments/assets/1fda9526-e6b5-45aa-a618-0c8b1196bac4)


### 📂 Category

```json
{
  "id": 2,
  "name": "Italian",
  "description": "Pasta & more",
  "restaurants": []
}
```
Get All Categories – API Response
![get all category api response](https://github.com/user-attachments/assets/fefee907-8816-466d-b0c0-897107ff467f)


---

## 🚧 **Planned Enhancements**

* 🔐 JWT Authentication
* 📊 Pagination & Sorting
* 🖼️ Image Upload Support
* 🐳 Docker + CI/CD
* ✅ Test Coverage

---

## 👨‍💻 **Author**

**Karan Sahani**
📧 [karansahani723@gmail.com](mailto:karansahani723@gmail.com)
🌐 [GitHub](https://github.com/karansahani78) ・ [LinkedIn](https://www.linkedin.com/in/karan-sahani-70a0ba2b1/)

---

## 📜 **License**

Licensed under the [MIT License](LICENSE).

---

> ⭐ If you like this project, consider giving it a star on [GitHub](https://github.com/karansahani78/restaurant-review-system)!
