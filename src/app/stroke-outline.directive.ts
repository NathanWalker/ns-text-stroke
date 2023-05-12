import {
  Directive,
  ElementRef,
  Input,
  SimpleChanges,
  inject,
} from "@angular/core";
import { Color, Label, Utils } from "@nativescript/core";

@Directive({
  selector: "[strokeOutline]",
})
export class StrokeOutlineDirective {
  el = inject(ElementRef);
  @Input() text: string;
  @Input() strokeOutline: {
    color: string;
    textColor: string;
    width: number;
  };
  label: Label;
  init = false;

  constructor() {
    this.label = this.el.nativeElement;
    this.label.on("loaded", () => {
      if (!this.init) {
        this.init = true;
        this.applyStroke();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.init && changes.text.previousValue !== changes.text.currentValue) {
      console.log("applyStroke:", this.label.text);
      this.applyStroke();
    }
  }

  private applyStroke() {
    // const color = new Color(this.strokeOutline.color);
    // const textColor = new Color(this.strokeOutline.textColor || "#fff");
    // const width = Utils.isNumber(this.strokeOutline?.width)
    //   ? this.strokeOutline.width
    //   : -1;
    // if (global.isIOS) {
    //   const uiLabel = <UILabel>this.label.ios;
    //   const strokeTextAttributes = {};
    //   strokeTextAttributes[NSStrokeColorAttributeName] = color.ios;
    //   strokeTextAttributes[NSForegroundColorAttributeName] = textColor.ios;
    //   strokeTextAttributes[NSStrokeWidthAttributeName] = width;

    //   uiLabel.attributedText =
    //     NSAttributedString.alloc().initWithStringAttributes(
    //       this.text,
    //       <NSDictionary<string, any>>strokeTextAttributes
    //     );
    // } else {
    // //   const textView = <android.widget.TextView>this.label.android;
    // //   console.log(textView);

    // //   textView.setText(this.text);
    // //   textView.setTextColor(textColor.android);
    // //   textView.setShadowLayer(1.5, 1.3, 1.6, color.android);
    // }
  }
}
