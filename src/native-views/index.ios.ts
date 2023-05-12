import { Color, Label, Utils } from "@nativescript/core";

export class StrokedLabel extends Label {
  initNativeView() {
    super.initNativeView();
  }
}

const strokeOutline = {
  color: "#000",
  textColor: "#fff",
  width: 2,
};

export function applyCustomizations() {
  const setNativeText = Label.prototype._setNativeText;
  Label.prototype._setNativeText = function (reset = false) {
    setNativeText.call(this, reset);

    const color = new Color(strokeOutline.color);
    const textColor = new Color(strokeOutline.textColor || "#fff");
    const width = Utils.isNumber(strokeOutline?.width)
      ? strokeOutline.width
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
  };
}
