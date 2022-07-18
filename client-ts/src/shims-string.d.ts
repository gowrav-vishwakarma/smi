declare module "string" {
  var S: {
    (o: any): StringJS;
    default: {
      (o: any): StringJS;
    };
    VERSION: string;
    TMPL_OPEN: string;
    TMPL_CLOSE: string;
  };
  export = S;
}

declare var S: { (o: any): StringJS };
