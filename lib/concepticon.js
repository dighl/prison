/* Utility functions for accessing concepticon data.
 *
 * author   : Johann-Mattis List
 * email    : mattis.list@lingulist.de
 * created  : 2014-08-16 20:34
 * modified : 2014-08-16 20:34
 *
 */

/* */
function autoResize(id,id2){
    var newheight;
    var newwidth;

    if(document.getElementById){
        newheight=document.getElementById(id).contentWindow.document .body.scrollHeight;
        newwidth=document.getElementById(id).contentWindow.document .body.scrollWidth;
    }

    document.getElementById(id2).style.height= (newheight + 200) + "px";
    document.getElementById(id2).style.width= (newwidth + 100) + "px";
}

function showConcept(oid)
{
  var elm = document.getElementById(oid);
  var owid = elm.dataset.index;
  var url = 'http://concepticon.github.io/iframe.html?'+owid;
  var append_string = '<div id="concepticon_popup"><span style="cursor:pointer;border-radius:5px;float:right;border:2px solid black;padding:3px;margin:3px;" onclick="'+"$('#concepticon_popup').remove();"+'">×</span> <h4>OMEGAWIKI ID '+owid+'</h4><iframe name="concepticon" id="ifr" src="'+url+'">NOIFRAMESUPPORT</iframe></div>';
  
  $('#'+oid).parent().append(append_string);
  $('#concepticon_popup').draggable().resizable();
  autoResize('ifr','concepticon_popup');
}

function prepareConceptPopup()
{
  /* function builds popups for spans which contain a concepticon ID */
  var spans = document.getElementsByClassName('concepticon');
  for(var i=0,span;span=spans[i];i++)
  {
    span.onclick = function()
    {
      showConcept(this.id);
    }
  }
}

prepareConceptPopup();
