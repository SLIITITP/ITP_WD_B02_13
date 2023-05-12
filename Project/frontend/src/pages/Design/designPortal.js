import React,{ Component } from "react";

import "../Design/designPortal.css"
import "../Design/js/portal"

import green from "./images/green.jpg";
import mehroon from "./images/mehroon.jpg";
import navyblue from "./images/navyblue.jpg";
import red from "./images/red.jpg";
import white from "./images/white.jpg";
import yellow from "./images/yellow.jpg";

export default function DesignPortal() {
    return(
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div class="popup" id="popup">
        <div id="modal">
            <div class="finalBoard" id="finalBoard">
                <img id="final-img" src="" alt=""/>
                <p id="finaltext"></p>
                <div id="finalimage">

                </div>
            </div>
            <div class="information">
                <h1>Design Details</h1>
                <h4>This is your final product</h4>
                <div class="row">
                    <span>Size</span>
                    <p id="finalsizepreview"></p>
                </div>
                <div class="row">
                    <span>Quantity</span>
                    <p id="finalquantity"></p>
                </div>
                <div class="row">
                    <span>Text</span>
                    <p id="finaltextpreview"></p>
                </div>
                <div class="row">
                    <span>Text Color</span>
                    <p id="textcolorpreview"></p>
                </div>
                <div class="row">
                    <span>Text Size</span>
                    <p id="textsizepreview"></p>
                </div>
                <div class="row">
                    <span>Text Weigth</span>
                    <p id="textweightpreview"></p>
                </div>
                <div class="row">
                    <span>Text Style</span>
                    <p id="textstylepreview"></p>
                </div>
                <div class="row">
                    <span>Text Decoration</span>
                    <p id="textdecorationpreview"></p>
                </div>
                <button class="btn-light" id="close">Close</button>
            </div>
        </div>
    </div>
      

        <div class="main-content">
            <div class="header">
                <h1>Design Portal</h1>
            </div>
            <div id="tshirtBoard" class="tshirtBoard">
                <img id="preview-img" src={white} />
                <p id="text"></p>
                <div id="image" class="image">

                </div>

            </div>
            <div class="collection-row">
                <img id="green-tshirt" onclick="swap(document.getElementById('preview-img').src , this.src , this.id)"
                    src={green} alt=""/>
                <img id="mehroon-tshirt" onclick="swap(document.getElementById('preview-img').src , this.src , this.id)"
                    src={mehroon} alt=""/>
                <img id="navyblue-tshirt"
                    onclick="swap(document.getElementById('preview-img').src , this.src , this.id)"
                    src={navyblue} alt=""/>
                <img id="red-tshirt" onclick="swap(document.getElementById('preview-img').src , this.src , this.id)"
                    src={red} alt=""/>
                <img id="yellow-thsirt" onclick="swap(document.getElementById('preview-img').src , this.src , this.id)"
                    src={yellow} alt=""/>
            </div>
        </div>

        <div class="container">
        <div class="sidebar">

            <div class="heading">
                <h1>Add Your Text Here</h1>
            </div>
            <div class="row">
                <input type="text" class="fullWidth-input" id="tshirt_text" />
            </div>
            <div class="row">
                <label for="text-size">Font Size</label>
                <input class="small-input" type="text" id="text-size" maxlength="2" />
            </div>
            <div class="row">
                <label for="bold">Font Bold</label>
                <input type="checkbox" class="check" id="bold"/>
            </div>

            <div class="row">
                <label for="size">Italic</label>
                <input type="checkbox" class="check" id="italic"/>
            </div>

            <div class="row">
                <label for="size">Underline</label>
                <input type="checkbox" class="check" id="underline"/>
            </div>
            <div class="row">
                <label for="text-color">Text Color</label>
                <input id="text-color" type="color" value="#000000" onchange="updateColor(this)"
                    onkeyup="updateColor(this)" />
            </div>

        </div>


        <div class="sidebar">
            <div class="heading margin-top-10">
                <h4>Select Your Size</h4>
            </div>
            <div class="row">
                <input class="label-control-check" type="checkbox" name="size" value="Small" id="1"
                    onclick="setsize(this)"/>
                <label class="label-control" for="1">S</label>
                <input class="label-control-check" type="checkbox" name="size" id="2" value="Medium"
                    onclick="setsize(this)"/>
                <label class="label-control" for="2">M</label>
                <input class="label-control-check" type="checkbox" name="size" id="3" value="Large"
                    onclick="setsize(this)"/>
                <label class="label-control" for="3">L</label>
                <input class="label-control-check" type="checkbox" name="size" id="4" value="Extra Large"
                    onclick="setsize(this)"/>
                <label class="label-control" for="4">XL</label>
                <input class="label-control-check" type="checkbox" name="size" id="5" value="XXL"
                    onclick="setsize(this)"/>
                <label class="label-control" for="5">XXL</label>
            </div>

            <div class="row">
                <label for="quantity">Quantity</label>
                <input class="small-input" type="text" id="quantity" maxlength="3" />
            </div>
            <div class="heading row">
                <h4>Select Template</h4>
                <button class="light" id="show-selector"><i class="fas fa-angle-up"></i></button>
            </div>

            <div class="heading row">
                <h4>Select Print Type</h4>
                <button class="light" id="show-selector"><i class="fas fa-angle-up"></i></button>
            </div>

            <div class="heading row">
                <h4>Select Product Material</h4>
                <button class="light" id="show-selector"><i class="fas fa-angle-up"></i></button>
            </div>

            <div class="heading row">
                <h4>Select Product Type</h4>
                <button class="light" id="show-selector"><i class="fas fa-angle-up"></i></button>
            </div>
            
            <div class="row"><button id="purchase" class="fluid blue-light">Purchase</button></div>

        </div>
    </div>

    </div>
        
    );
}