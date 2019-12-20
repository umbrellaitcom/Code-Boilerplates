declare module '*.scss' {
  const styles: { [className: string]: string };
  export = styles;
}

declare module '*.yaml' {
  interface YamlObject {
    [key: string]: string | YamlObject;
  }
  const yaml: YamlObject;
  export = yaml;
}

declare module '*.woff' {
  const name: string;
  export = name;
}

declare module '*.otf' {
  const name: string;
  export = name;
}

declare module '*.ttf' {
  const name: string;
  export = name;
}

declare module '*.png' {
  const name: string;
  export = name;
}

declare module '*.svg' {
  const name: string;
  export = name;
}
