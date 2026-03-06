<div align="center">

# <img src="https://www.theodinproject.com/assets/icons/odin-icon-22b41941.svg"> <br>

# Todo List

**A simple, yet powerful, client-side To-Do list application built with vanilla JavaScript and Webpack.**<br>
**Part of The Odin Project, FullStack Javascript courses**

**[Live Demo](https://franchuphone.github.io/todo-list/)**

</div>

## 📖 Overview

The Todo List project is a straightforward web application designed to help users manage their daily tasks efficiently. It provides a clean and intuitive interface for adding, tracking, and completing tasks, emphasizing simplicity and user experience. Built with modern web technologies, it serves as a robust example of a client-side application without a dedicated backend, suitable for personal task management or as a foundational project for further development.

## ✨ Features

- 🎯 **Add New Tasks**: Quickly add new to-do items to your list.
- ✅ **Mark Tasks as Complete**: Toggle tasks between complete and incomplete states.
- 🗑️ **Delete Tasks**: Remove tasks from the list once they are no longer needed.
- 📝 **Task Display**: Clearly displays all active and completed tasks.
- 📅 **Due Dates**: Assign due dates to tasks, leveraging `date-fns` for robust date handling.
- 🔄 **Dynamic UI Updates**: Instantly reflect changes in the user interface without page reloads.
- 💾 **Local Storage Persistence**: Automatically save and load to-do data from the browser's local

## 🔧 Future improvements

- 🎯 **Add colour to expired tasks**: quickly see if tasks are expired or not.
- 🎯 **Change tasks order**: list of tasks are currently ordered in a project by their creation date, not by their due date.
- 🎯 **Dynamic colour on menu elements**: change the colour of elements on lateral menu depending on their state (neutral, expired, achieved).
- 🎯 **Filter by date**: a click on a date will display all the tasks with the same due date.

## 🛠️ Tech Stack

**Frontend:**

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![date-fns](https://img.shields.io/badge/date--fns-F0E8C7?style=for-the-badge&logo=date-fns&logoColor=black)

**Build Tools:**

![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: `^14.x.x` or higher (includes npm)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Franchuphone/todo-list.git
    cd todo-list
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start development server**

    ```bash
    npm run start
    ```

4.  **Open your browser**
    Visit `http://localhost:8080` (or the port indicated in your console)

## 📁 Project Structure

```
todo-list/
├── src/                # All application source code
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Exact dependency versions
├── webpack.common.js   # Common Webpack configuration
├── webpack.dev.js      # Webpack configuration for development
└── webpack.prod.js     # Webpack configuration for production
```

## ⚙️ Configuration

### Webpack Configuration

This project uses Webpack for bundling. The configuration is split into three files:

- `webpack.common.js`: Contains shared configuration for both development and production.
- `webpack.dev.js`: Extends `webpack.common.js` with development-specific settings (e.g., `webpack-dev-server`).
- `webpack.prod.js`: Extends `webpack.common.js` with production-specific optimizations (e.g., minification).

You can modify these files to adjust build processes, loaders, plugins, and output settings.

### Development Workflow

To contribute or further develop this project:

1.  Ensure all prerequisites are met and dependencies are installed.
2.  `npm run start` to open the application in development mode with live reloading.
3.  Make changes in the `src/` directory. Webpack will automatically recompile and refresh your browser.

## 🚀 Deployment

### Production Build

To create an optimized, minified build of the application for production:

```bash
npm run build
```

This command will output the production-ready static files into the `dist/` directory (as configured in `webpack.prod.js`), which can then be deployed to any static web hosting service.

### Deployment Options

The generated static files can be deployed using various methods:

- **Static Hosting**: Services like Netlify, Vercel, GitHub Pages, or AWS S3. Simply upload the contents of the `dist/` folder.

## 🤝 Contributing

We welcome contributions to enhance this Todo List application! Please consider the following guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes following a clear commit message convention.
4.  Push your branch and open a pull request.

### Development Setup for Contributors

The development setup is straightforward, as outlined in the [Quick Start](#-quick-start) section. Ensure your local environment is set up correctly before submitting changes.

## 📄 License

No particular license, just keep in mind to respect the work of others and just point to this repository for credentials.

## 🙏 Acknowledgments

- **Webpack**: For powerful module bundling.
- **npm**: For package management.

## 📞 Support & Contact

- 🐛 Issues: [GitHub Issues](https://github.com/Franchuphone/todo-list/issues)
- 📧 Contact: [LinkedIn](https://chk.me/fDTZdvK)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Franchuphone

</div>
