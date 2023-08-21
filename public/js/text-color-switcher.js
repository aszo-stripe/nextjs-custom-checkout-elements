/*
 * Because buttons use a dynamic accent color, it's not always known what color
 * the button will be and therefore what color the button text should be.
 * For example, if the dynamic accent color is white then we want a dark gray
 * color to be used for the button text and vice versa. This will automatically
 * grab any buttons with the data-accent-color-btn attribute and change the
 * color the of the text depending on the button background color. It is run
 * on each page load.
*/

(async () => {
  /**
   * Helper to check a accent color and return either a light
   * or dark color to provide contrast with the background
  */
  const getContrast = (backgroundColor) => {

    // First check what format we're getting: rgb or hex?
    if (backgroundColor.slice(0, 3) === 'rgb') {
      // It's rgb so we just need to pull the values
      const match = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(backgroundColor)

      var r = parseInt(match[1]);
      var g = parseInt(match[2]);
      var b = parseInt(match[3]);
    } else {
      // It's hex so lets do a little clean up before pulling rgb
      // First, make it clear what kind of format we're dealing with
      var hexcolor = backgroundColor;

      if (hexcolor == null) {
        return "#F9FAFB"
      }

      // If a leading # is provided, remove it
      if (hexcolor.slice(0, 1) === '#') {
        hexcolor = hexcolor.slice(1);
      }

      // If a three-character hexcode, make six-character
      if (hexcolor.length === 3) {
        hexcolor = hexcolor.split('').map(function (hex) {
          return hex + hex;
        }).join('');
      }

      // Convert to RGB value
      var r = parseInt(hexcolor.substr(0,2),16);
      var g = parseInt(hexcolor.substr(2,2),16);
      var b = parseInt(hexcolor.substr(4,2),16);
    }

    // Get YIQ ratio
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // Check contrast
    return (yiq >= 129) ? '#374151' : '#F9FAFB';
  };

  // Get any links or buttons on the page that are set to use the brand's
  // accent color, check the color and change the text to have readable contrast
  document.querySelectorAll('[data-accent-color-btn]').forEach((btn) => {
    var btnBackgroundColor = window.getComputedStyle(btn).backgroundColor;
    var contrast = getContrast(btnBackgroundColor);
    btn.style.color = getContrast(btnBackgroundColor);

    // If it's a light contrast, add a slight border and shadow
    // to make the button stand out a little more
    if (contrast == "#374151") {
      btn.style.border = "1px solid #D1D5DB";
    }
  });
})();
