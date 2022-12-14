/*
 * orange-confort-plus - version 4.1.1 - 14-12-2022
 * Enhance user experience on web sites
 * © 2014 - 2022 Orange SA
*/
UciMask={settings:{launched:false,thickness:"none",option:"mask"},init:function(){if(!window.Modernizer||!Modernizr.touch){if(!document.getElementById("topMask")){topMask=document.createElement("div");topMask.className="uci_mask topMask";topMask.id="topMask";bottomMask=document.createElement("div");bottomMask.className="uci_mask bottomMask";bottomMask.id="bottomMask";document.getElementsByTagName("body")[0].appendChild(topMask);document.getElementsByTagName("body")[0].appendChild(bottomMask);vMouse=document.createElement("div");vMouse.className="vMouse";vMouse.id="vMouse";hMouse=document.createElement("div");hMouse.className="hMouse";hMouse.id="hMouse";document.getElementsByTagName("body")[0].appendChild(vMouse);document.getElementsByTagName("body")[0].appendChild(hMouse)}while(document.getElementById("topMask").hasChildNodes()){document.getElementById("topMask").removeChild(document.getElementById("topMask").childNodes[0])}document.getElementById("topMask").appendChild(UciMask.initCloseMask());document.getElementById("topMask").appendChild(UciMask.explainHowToCloseDiv())}},start:function(){if(!UciMask.settings.launched){UciMask.maskEventCreate()}UciMask.maskEvent(accessibilitytoolbar.mouseLastEvent)},initCloseMask:function(){var a11y_toolbar=accessibilitytoolbar.make(["div",{id:"closeMaskDiv",class:"closeMask"},["button",{id:"closeMask",title:accessibilitytoolbar.get("uci_close_mask"),type:"button",class:"closeMaskHidden uci-popin-btn ucibtn-secondary"},["span",{"aria-hidden":"true",class:"cdu-icon cdu-icon-croix"}],["span",{class:"cdu_n"},accessibilitytoolbar.get("uci_close_mask")]]]);a11y_toolbar.querySelector("#closeMask").onclick=function(){UciMask.closeMask()};return a11y_toolbar},explainHowToCloseDiv:function(){return accessibilitytoolbar.make(["div",{id:"howToClose",class:"howtoclose"},accessibilitytoolbar.get("howToClose")])},maskEventCreate:function(){document.addEventListener("mousemove",UciMask.maskEvent,false);document.addEventListener("keydown",(function(event){UciMask.exitMask(event)}),false);UciMask.settings.launched=true},exitMask:function(e){var winObj="";if(!e)e=window.event;var intKeyCode=e.keyCode;if(intKeyCode===27&&(document.getElementById("topMask").style.display==="block"||document.getElementById("vMouse").style.display==="block"||document.getElementById("hMouse").style.display==="block")){UciMask.closeMask()}},closeMask:function(){accessibilitytoolbar.setPref({target:{id:"a11yMaskEnabled",value:"false",type:"checkbox"}});UciMask.maskEventRemove()},maskEventRemove:function(){document.removeEventListener("mousemove",UciMask.maskEvent,false);document.getElementById("topMask").style.display="none";document.getElementById("closeMaskDiv").style.display="none";document.getElementById("bottomMask").style.display="none";document.getElementById("vMouse").style.display="none";document.getElementById("hMouse").style.display="none";UciMask.settings.launched=false},maskEvent:function(e){if(e){UciMask.draw(e.clientY,e.clientX)}},draw:function(positionY,positionX){if(this.settings.option==="mask"){closeMask=document.getElementById("closeMask");document.getElementById("howToClose").className=document.getElementById("howToClose").className.replace(/ howtocloselight{0,1}/,"");var size=90;closeMask.style.height="90px";closeMask.style.width="90px";if(typeof positionY=="undefined"){size=0}var topMaskHeight=0;if(positionY-size/2>0){topMaskHeight=positionY-size/2}document.getElementById("topMask").style.height=topMaskHeight+"px";document.getElementById("topMask").style.display="block";document.getElementById("closeMaskDiv").style.top=topMaskHeight+"px";document.getElementById("closeMaskDiv").style.display="block";document.getElementById("howToClose").style.top=topMaskHeight-document.getElementById("howToClose").clientHeight+"px";var bottomMaskHeight=0;var winHeight=0;if(window.getComputedStyle){winHeight=parseInt(document.documentElement.clientHeight,10)}else{winHeight=parseInt(document.documentElement.offsetHeight,10)}if(winHeight-topMaskHeight-size>0){bottomMaskHeight=winHeight-topMaskHeight-size}document.getElementById("bottomMask").style.height=bottomMaskHeight+"px";document.getElementById("bottomMask").style.display="block"}else{document.getElementById("topMask").style.display="none";document.getElementById("closeMaskDiv").style.display="none";document.getElementById("bottomMask").style.display="none";if(this.settings.option==="vruler"){document.getElementById("vMouse").style.display="block";document.getElementById("vMouse").style.left=""+(positionX+1)+"px"}else{document.getElementById("vMouse").style.display="none"}if(this.settings.option==="hruler"){document.getElementById("hMouse").style.display="block";document.getElementById("hMouse").style.top=""+(positionY+1)+"px"}else{document.getElementById("hMouse").style.display="none"}}}};