# 🚀 Task Manager with Next.js

This **Task Manager** application is built using **Next.js** and strictly follows the principles of **Clean Architecture**.

---

## 🛠️ Tech Stack & Configuration

- **Next.js Version:** **16.0.1**
- **Router:** Utilizes the **App Router** for routing and structure.

---

## 🏗️ Project Structure (Clean Architecture)

The project code is organized into distinct **layers** to ensure a clear separation of concerns, maintainability, and testability.

| Directory                  | Layer Description               | Key Notes                                                                                                                                   |
| :------------------------- | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `/src/app`                 | **Presentation Layer (UI)**     | Houses the application pages and display logic.                                                                                             |
| `/src/components`          | **UI Components**               | Contains all UI components designed to be **reusable** across the application.                                                              |
| `/src/use-cases`           | **Application/Use Cases Layer** | Contains classes responsible for application-specific business rules and orchestrating domain entities. **Uses Dependency Injection (DI)**. |
| `/src/repositories`        | **Domain Layer Interfaces**     | Defines the **Repository interfaces** (contracts) that outline how data access should be performed.                                         |
| `/src/data`                | **Data Access Layer**           | **Implements the Repository interfaces** defined in the Domain layer.                                                                       |
| `/src/entities`            | **Domain/Entity Layer**         | Contains the core **data models** (entities) that encapsulate enterprise-wide business rules.                                               |
| `/src/infrastructure/auth` | **Infrastructure**              | Dedicated to external concerns, such as the **authentication provider**.                                                                    |
| `/src/config`              | **Infrastructure**              | Global application configurations, including **Axios setup**.                                                                               |

### ⚠️ Note on Data Persistence

The current implementation in `/src/data` uses **mock-up data** without a connected database. **Any data created will be lost upon exiting the application.**

---

## 💡 Getting Started

_(This section is a placeholder. You should fill it with your installation steps.)_

1.  Clone the repository: `git clone https://github.com/bhuedies/task-manager.git`
2.  Install dependencies: `npm install` or `yarn install`
3.  Run the development server: `npm run dev` or `yarn dev`
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---
