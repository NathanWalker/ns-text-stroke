import { Color, Label, Utils } from "@nativescript/core";

@NativeClass()
export class TextStrokeTextView extends android.widget.TextView {
  owner: WeakRef<
    Label & {
      textStroke: {
        color: string;
        textColor: string;
        width: number;
      };
    }
  >;

  constructor(context: android.content.Context) {
    super(context);

    return global.__native(this);
  }

  onDraw(canvas: android.graphics.Canvas): void {
    const owner = this.owner.get();
    if (owner?.textStroke) {
      const textStroke = owner?.textStroke;
      //set paint to fill mode
      const p = this.getPaint();
      p.setStyle(android.text.TextPaint.Style.FILL);
      //draw the fill part of text
      super.onDraw(canvas);
      //stroke color and width
      p.setStyle(android.text.TextPaint.Style.STROKE);
      p.setStrokeWidth(Utils.layout.toDevicePixels(textStroke.width));
      this.setTextColor(new Color(textStroke.color).android);
      //draw stroke
      super.onDraw(canvas);
      // darw original text color fill back
      p.setStyle(android.text.TextPaint.Style.FILL);
      this.setTextColor(new Color(textStroke.textColor).android);
      super.onDraw(canvas);
    } else {
      super.onDraw(canvas);
    }
  }
}

export function setupNativeCustomizations() {
  Label.prototype.createNativeView = function () {
    const strokedTextView = new TextStrokeTextView(this._context);
    strokedTextView.owner = new WeakRef(this);
    return strokedTextView;
  };
}
