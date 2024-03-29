# **90s Calc**

A vanilla JS/TypeScript portfolio project which emulates the look of the [TI-108](https://education.ti.com/en/products/calculators/elementary-calculators/ti-108) calculator. **[See it in action here](https://90s-calc.netlify.app/)**.

- [Description](#description)
- [Installation and setup](#installation-and-setup)
  - [Install](#install)
  - [Development](#development)
  - [Production](#production)
- [How to use](#how-to-use)
  - [Interface](#interface)
    - [Keyboard](#keyboard)
    - [Other Functions](#other-functions)
- [Adding/removing Patterns](#addingremoving-patterns)
- [License](#license)

## **Description**

This front-end application allows an end user to perform calculations using basic arithmetic operations like those found on a typical calculator. Once a calculation is made, it will be added to a list within the sidebar area.

A series of patterns are used as the application background and can be switched by pressing a dedicated pattern button found on the calculator [interface](#interface).

Each calculation as well as the currently set pattern are stored within local storage for persistance.

## **Installation and setup**

This project uses [Parcel](https://parceljs.org/) for bundling, building, and local development.

### **Install**

- [Download zip](https://github.com/antmercado94/90s-calc/archive/refs/heads/main.zip) or clone: `git clone https://github.com/antmercado94/90s-calc.git`
- Install dependencies using npm: `npm install`

### **Development**

Develop locally with Parcel:

```
npm run start
```

### **Production**

Build application:

```
npm run build
```

##### Location of all build files will be placed into the `/dist` directory.

## **How to use**

### **Interface**

The interface is similar to that of the [TI-108](https://education.ti.com/en/products/calculators/elementary-calculators/ti-108) series of elementary school calculators, of which the design of the application is solely based on.

#### **Keyboard**

The main aspects of the interface can be triggered using keyboard keys. The table below shows a list of usable keys beside its interface equivalent:

| Keyboard         | Interface |
| ---------------- | --------- |
| 0-9              | Number    |
| .                | Decimal   |
| =                | Equals    |
| +                | Add       |
| -                | Subtract  |
| \*               | Multiply  |
| /                | Divide    |
| Backspace        | Delete    |
| Spacebar, Escape | All Clear |

#### **Other Functions**

A list of other interface buttons providing additional functionality:

1. **Open/Close** - toggles sidebar appearance.

2. **Remove Calculations** - remove all calculations from sidebar.

3. **Change Pattern** - switch the currently displayed background pattern.

4. **Pause Background** - stops/resumes current pattern background animation.

### **Adding/Removing Patterns**

New patterns can be added by placing a **.jpg** or **.png** image within the [`/images/background/`](https://github.com/antmercado94/90s-calc/tree/main/images/background) directory, then adding the file as an export within [`/src/js/lib/patterns/index.ts`](https://github.com/antmercado94/90s-calc/tree/main/src/js/lib/patterns).

<sub> Size of pattern images should be **175x175**.<sub>

## **License**

Code released under [the MIT license](https://github.com/antmercado94/90s-calc/blob/main/LICENSE).
