import { Color, Label, Utils } from "@nativescript/core";

export function setupNativeCustomizations() {
  const setNativeText = Label.prototype._setNativeText;
  Label.prototype._setNativeText = function (reset = false) {
    setNativeText.call(this, reset);
    if (this.textStroke) {
      const color = new Color(this.textStroke.color);
      const textColor = new Color(this.textStroke.textColor || "#fff");
      const width = Utils.isNumber(this.textStroke?.width)
        ? this.textStroke.width
        : -1;

      const uiLabel = <UILabel>this.nativeViewProtected;
      const strokeTextAttributes = {};
      strokeTextAttributes[NSStrokeColorAttributeName] = color.ios;
      strokeTextAttributes[NSForegroundColorAttributeName] = textColor.ios;
      strokeTextAttributes[NSStrokeWidthAttributeName] = width;

      uiLabel.attributedText =
        NSAttributedString.alloc().initWithStringAttributes(
          this.text,
          <NSDictionary<string, any>>strokeTextAttributes
        );
    }
  };
}
