import { Color, Label, Utils } from "@nativescript/core";

@NativeClass()
export class StrokedTextView extends android.widget.TextView {

    constructor(context: android.content.Context) {
		super(context);

		return global.__native(this);
	}

    // onDraw(canvas: android.graphics.Canvas): void {
    //     // Redraw the shadow a couple of times and all the alpha gets summed up and the result is an outline.
    //     for (let i = 0; i < 5; i++) {
    //         super.onDraw(canvas);
    //     }
    // }

    onDraw(canvas: android.graphics.Canvas): void {
        // const typeface = this.getTypeface();
   
            //set paint to fill mode
            const p = this.getPaint();
            p.setStyle(android.text.TextPaint.Style.FILL);        
            //draw the fill part of text
            super.onDraw(canvas);       
            //save the text color   
            const currentTextColor = this.getCurrentTextColor();    
            //set paint to stroke mode and specify 
            //stroke color and width        
            p.setStyle(android.text.TextPaint.Style.STROKE);
            p.setStrokeWidth(Utils.layout.toDevicePixels(1));
            this.setTextColor(new Color('#000').android);
            //draw stroke
            super.onDraw(canvas);      
           // darw original text color fill back
           p.setStyle(android.text.TextPaint.Style.FILL);  
           this.setTextColor(new Color('#fff').android); 
           super.onDraw(canvas);   
       
   
    }
}

export function applyCustomizations() {
    Label.prototype.createNativeView = function() {
        // console.log(this.style.fontFamily);
        return new StrokedTextView(this._context);
    }
    // const origOnLoaded = Label.prototype.onLoaded;
    // Label.prototype.onLoaded = function(...args) {
    //     origOnLoaded.call(this, ...args);
    //     (<android.widget.TextView>this.nativeViewProtected).setShadowLayer(.01, .01, 2, blackcolor.android);
    //     // this.nativeViewProtected.setText(this.text);
    //     // this.nativeViewProtected.setShadowLayer(1.5, 1.3, 1.6, blackcolor.android);
    //     this.nativeViewProtected.setTextColor(whitecolor.android);
    // }
}

// export class StrokedLabel extends Label {

//     createNativeView() {
//         return new StrokedTextView(this._context);
//     }
// }
     