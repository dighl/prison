/* Use script injection and proxies to handle external requests.
 *
 * author   : Johann-Mattis List
 * email    : mattis.list@lingulist.de
 * created  : 2014-08-17 13:20
 * modified : 2014-08-17 13:20
 *
 */

function loadResource(resource, callback, data, proxy)
{
  if(typeof proxy == 'undefined')
  {
    proxy = 'http://lingulist.de/simple-proxy.php';
  }
  if(typeof callback == 'undefined')
  {
    callback = function (response) {console.log(response['contents'])};
  }
  if(typeof data == 'undefined')
  {
    data = 'data';
  }
  
  /* define the url */
  var url = proxy+'?url='+resource;

  $.ajax(
      {
      url: url,
      dataType: "jsonp",
      jsonp: "callback",
      success: function( response ) {callback(response)}
      });
}

