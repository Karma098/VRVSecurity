# User Role Management System

## **Overview**

The goal of this project is to design a secure and user-friendly interface for administrators to efficiently manage users, roles, and permissions. It provides functionality to:

- Assign roles to users.
- Define and modify permissions dynamically.
- Simulate API interactions for better validation of CRUD operations.

---

## **Features**

### **1. User Management**

- View and manage a list of users.
- Add new users, edit existing user details, or delete users.
- Assign roles to users and manage their status (e.g., Active/Inactive).

### **2. Role Management**

- Define and edit roles dynamically.
- Associate roles with specific permissions (e.g., Read, Write, Delete) or custom attributes.

### **3. Dynamic Permissions**

- Assign or modify permissions associated with roles.
- Clear and intuitive display of permissions for ease of understanding and updating.

---

## **Getting Started**

Follow these steps to set up and run the project:

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd <project-directory>
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Run the Development Server**

```bash
npm run dev
```

### **4. First add Roles then Users**

---

## **Usage Instructions**

### **Access the Interface:**

Once the development server is running, navigate to the displayed URL in your web browser (e.g., `http://localhost:3000`).

### **Explore the Features:**

- Use the user management interface to add, edit, or delete users.
- Define new roles or modify existing ones via the role management section.
- Update permissions dynamically and view changes reflected in real-time.

---

## **Project Structure**

- **/src:** Contains the source code for the project.
- **/public:** Static assets and configuration files.
- **/src/components:** Contains Functional components.
- **/src/hooks:** Contains cutom hooks.
- **/src/mocks:** Contains mock api's.
- **/src/store:** Contains redux store and slices.
- **/src/utils:** Contains constants , regex etc.

---
