// // /*Set variables */
// // var tshirt_text = document.getElementById("tshirt_text");
// // var tshirtBoard = document.getElementById("tshirtBoard");
// // var text_color = document.getElementById("text-color");
// // var text_bold = document.getElementById("bold");
// // var text_italic = document.getElementById("italic");
// // var text_underline = document.getElementById("underline");
// // var text = document.getElementById("text");
// // var text_size = document.getElementById("text-size");
// // var showSelector = document.getElementById("show-selector");
// // var imageSelector = document.getElementById("image-selector");
// // var image = document.getElementById("image");
// // var quantity = document.getElementById("quantity");
// // var finalImage = {
// //     tshirt: "assets/images/white.jpg",
// //     text: "",
// //     textLeft: "125px",
// //     textTop: "80px",
// //     textSize: "16px",
// //     textColor: "#000",
// //     img: "",
// //     icon: "",
// //     textBold: "normal",
// //     textItalic: "normal",
// //     text_underline: "none",
// //     quantity: "",
// //     size: ""
// // };
// // var purchase = document.getElementById("purchase");
// // var show = true;
// // /*Method to swap preview image with the clicked image  */
// // function swap(currentImage, newImage, id) {
// //     var OldImage = currentImage;
// //     document.getElementById("preview-img").src = newImage;
// //     document.getElementById(id).src = OldImage;
// //     finalImage.tshirt = newImage;
// // }
// // /*Method to Change color of text  */
// // function updateColor(textColor) {
// //     text.style.color = textColor.value;
// //     finalImage.textColor = text.style.color;
// // }
// // /*Method to make text bold */
// // text_bold.addEventListener('click', function () {
// //     if (this.checked == true) {
// //         text.style.fontWeight = "bold";
// //         finalImage.textBold = "bold";
// //     } else {
// //         text.style.fontWeight = "normal";
// //         finalImage.textBold = "normal";
// //     }
// // });
// // /*Method to make text italic */
// // text_italic.addEventListener('click', function () {
// //     if (this.checked == true) {
// //         text.style.fontStyle = "Italic";
// //         finalImage.textItalic = "italic";
// //     } else {
// //         text.style.fontStyle = "normal";
// //         finalImage.textItalic = "normal";
// //     }
// // });
// // /*Method to make text underline */
// // text_underline.addEventListener('click', function () {
// //     if (this.checked == true) {
// //         text.style.textDecoration = "underline";
// //         finalImage.text_underline = "underline";
// //     } else {
// //         text.style.textDecoration = "none";
// //         finalImage.text_underline = "none";
// //     }
// // });
// // /*Method to get size */
// // function setsize(size) {
// //     for (var i = 1; i <= 5; i++) {
// //         document.getElementById(i).checked = false;

// //     }
// //     document.getElementById(size.id).checked = true;
// //     finalImage.size = size.value;
// // }
// // /*Set Quantity */
// // quantity.addEventListener('blur', function () {
// //     finalImage.quantity = this.value;
// // });
// // /*Method to get text from user input while typing to tshirtboard frame*/
// // tshirt_text.addEventListener("keyup", function () {
// //     text.innerHTML = tshirt_text.value;

// // });
// // tshirt_text.addEventListener("blur", function () {
// //     finalImage.text = this.value;
// // });

// // /*Method to drag and drop text anywhere on tshirt */
// // text.onmousedown = function (event) {

// //     var shiftX = event.pageX - text.getBoundingClientRect().left;
// //     var shiftY = event.pageY - text.getBoundingClientRect().top;

// //     text.style.position = 'absolute';
// //     text.style.zIndex = 1000;
// //     document.body.append(text);

// //     moveAt(event.pageX, event.pageY);

// //     // centers the text at (pageX, pageY) coordinates
// //     function moveAt(pageX, pageY) {

// //         text.style.left = pageX - shiftX + 'px';
// //         text.style.top = pageY - shiftY + 'px';

// //     }

// //     function onMouseMove(event) {
// //         moveAt(event.pageX, event.pageY);
// //     }

// //     // (3) move the text on mousemove
// //     tshirtBoard.addEventListener('mousemove', onMouseMove);

// //     // (4) drop the text, remove unneeded handlers
// //     text.onmouseup = function () {
// //         tshirtBoard.removeEventListener('mousemove', onMouseMove);
// //         text.onmouseup = null;
// //         finalImage.textLeft = (text.offsetLeft - tshirtBoard.offsetLeft) + "px";
// //         finalImage.textTop = (text.offsetTop - tshirtBoard.offsetTop) + "px";

// //     };

// // };

// // text.ondragstart = function () {
// //     return false;
// // };

// // /*Method to set Background of the text */
// // function setTextBackground(color, opacity) {
// //     text.style.background = color;
// //     text.style.opacity = opacity;
// // }
// // /*Handle Event to change size */

// // text_size.addEventListener('keyup', function () {
// //     text.style.fontSize = text_size.value + "px";
// //     finalImage.textSize = this.value + "px";
// // });

// // /*Event to control dropdown */
// // showSelector.addEventListener('click', function () {
// //     if (show == true) {
// //         imageSelector.style.display = "none";
// //         document.querySelector("#show-selector .fas").classList.remove("fa-angle-up");
// //         document.querySelector("#show-selector .fas").classList.add("fa-angle-down");
// //         show = false;
// //     } else {
// //         imageSelector.style.display = "flex";
// //         document.querySelector("#show-selector .fas").classList.remove("fa-angle-down");
// //         document.querySelector("#show-selector .fas").classList.add("fa-angle-up");
// //         show = true;
// //     }
// // });

// // /*Method to add Image on tshirt */
// // function addImage(source) {
// //     //src.removeAttribute("onclick");
// //     if (image.hasChildNodes()) {
// //         image.removeChild(image.childNodes[0]);
// //         finalImage.icon = "";
// //     }

// //     var currentimage = document.createElement("img");
// //     currentimage.setAttribute("src", source.src);
// //     image.append(currentimage);
// //     source.removeAttribute("onclick");
// //     finalImage.img = source;

// // }
// // /*Method to add Image on tshirt */
// // function addIcon(source) {
// //     //src.removeAttribute("onclick");
// //     if (image.hasChildNodes()) {
// //         image.removeChild(image.childNodes[0]);
// //         finalImage.img = "";
// //     }

// //     var currentIcon = document.createElement("i");
// //     currentIcon.setAttribute("class", source.classList);
// //     image.append(currentIcon);
// //     source.removeAttribute("onclick");
// //     finalImage.icon = source;

// // }


// purchase.onclick = function () {
//     document.getElementById("popup").style.display = "flex";
//     document.getElementById("modal").style.animationPlayState = "running";
//     document.getElementById("modal").style.WebkitAnimationPlayState = "running";

//     document.getElementById("final-img").src = finalImage.tshirt;

//     var finalText = document.getElementById("finaltext");
//     finalText.setAttribute("style", "top:" + finalImage.textTop + "; left:" + finalImage.textLeft + "; position: absolute; font-weight:" + finalImage.textBold + "; font-style:" + finalImage.textItalic + "; text-decoration:" + finalImage.text_underline + ";font-size:" + finalImage.textSize + ";color:" + finalImage.textColor + ";");
//     finalText.innerText = finalImage.text;

//     document.getElementById("finalsizepreview").innerText = finalImage.size;
//     document.getElementById("finalquantity").innerText = finalImage.quantity;
//     document.getElementById("finaltextpreview").innerText = finalImage.text;
//     document.getElementById("textcolorpreview").innerText = finalImage.textColor;
//     document.getElementById("textsizepreview").innerText = finalImage.textSize;
//     document.getElementById("textweightpreview").innerText = finalImage.textBold;
//     document.getElementById("textstylepreview").innerText = finalImage.textItalic;
//     document.getElementById("textdecorationpreview").innerText = finalImage.text_underline;
//     if (document.getElementById("finalimage").hasChildNodes) {
//         document.getElementById("finalimage").removeChild(document.getElementById("finalimage").childNodes[0]);
//     }
//     if (finalImage.icon === "") {
//         document.getElementById("finalimage").append(finalImage.img);
//     } else {
//         document.getElementById("finalimage").append(finalImage.icon);
//     }



// }
// document.getElementById("close").addEventListener('click', function () {
//     document.getElementById("popup").style.display = "none";
// });
