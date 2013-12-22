/*
* @author GabrielJMJ /twitter
*/

function isValid(url){
	var URL = url;
	var URL2 = URL.split( '/' );
	if( URL2[2] == 'instagram.com' && URL2[3] == 'p' && URL2[4] !== undefined && URL2[4] != ''){
		return true;
	}else{
		return false;
	}
}

$(document).ready(function(){
	function setMediaInfo(url){
		try{
			$.ajax({
				url: url,
				type: "GET",
				dataType: "text",
				success: function(data){
					$('#load').hide();
					var mediaType = data.match(/<meta property="og:type" content=\"([^\"]*)\" \/>/);
					if(mediaType[1] == 'video'){
						var mediaURLComplete = data.match(/<meta property="og:video" content=\"([^\"]*)\" \/>/);
						
						var mediaUrlBig = mediaURLComplete[1];
						var mediaUrlMedium = mediaURLComplete[1].replace('101.mp4', '102.mp4');
						
						var mediaFormat = '<select id="format" class="form-control" style="width: 200px; -webkit-border-radius: 4px 4px 0px 0px;"><option value="mp4">MP4 (Default)</option><option value="avi">AVI</option><option value="3gp">3GP</option><option value="flv">FLV</option><option value="mov">MOV</option><option value="mpeg">MPEG</option></select>';
						
						var mediaExt = 'mp4';
						
						var mediaShow = '<video width="200" height="200" controls><source src="' + mediaUrlBig + '" type="video/mp4"></video>';
						
						var fileNameBigComplete = mediaURLComplete[1].split('/');
						var fileNameBig = fileNameBigComplete[3];
						
						var fileNameMediumComplete = mediaUrlMedium.split('/');
						var fileNameMedium = fileNameMediumComplete[3];	
						
						var downloadLinks = '<li><a href="' + mediaUrlBig + '" id="download-big" download="' + fileNameBig + '">Big size</a></li><li><a href="' + mediaUrlMedium + '" id="download-low-quality" download="' + fileNameMedium + '">Medium size</a></li>';
					}else{
						var mediaURLComplete = data.match(/<meta property="og:image" content=\"([^\"]*)\" \/>/);
						
						var mediaUrlBig = mediaURLComplete[1];
						var mediaUrlMedium = mediaURLComplete[1].replace('7.jpg', '6.jpg');
						var mediaUrlSmall = mediaURLComplete[1].replace('7.jpg', '5.jpg');
						
						var mediaFormat = '<select id="format" class="form-control" style="width: 200px; -webkit-border-radius: 4px 4px 0px 0px;"><option value="jpg">JPEG (Default)</option><option value="png">PNG</option><option value="gif">GIF</option></select>';
						
						var mediaExt = 'jpg';
						
						var mediaShow = '<img width="200" height="200" src="' + mediaUrlBig + '" />';
						
						var fileNameBigComplete = mediaURLComplete[1].split('/');
						var fileNameBig = fileNameBigComplete[3];
						
						var fileNameSmallComplete = mediaUrlSmall.split('/');
						var fileNameSmall = fileNameSmallComplete[3];
						
						var fileNameMediumComplete = mediaUrlMedium.split('/');
						var fileNameMedium = fileNameMediumComplete[3];
						
						var downloadLinks = '<li><a href="' + mediaUrlBig + '" id="download-big" download="' + fileNameBig + '">Big size</a></li><li><a href="' + mediaUrlMedium + '" id="download-low-quality" download="' + fileNameMedium + '">Medium size</a></li><li><a href="' + mediaUrlSmall + '" id="download-low-quality" download="' + fileNameSmall + '">Small size</a></li>';
					}
					
					var authorComplete = data.match(/<meta property="og:description" content=\"([^\"]*)\" \/>/);
					var authorSplit = authorComplete[1].split("'");
					var authorName = authorSplit[0];
					
					$('#media_info').html('<div class="preview"><div class="title"><b>PREVIEW:</b></div><div class="img-video">' + mediaShow + '</div><div class="user_photo">By <b><a href="http://instagram.com/' + authorName + '" target="_blank" class="link1">@' + authorName + '</a></b></div><div class="format2">' + mediaFormat + '</div><div class="download_link"></div></div>');
					
					$('.download_link').html('<div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" style="width: 199px; -webkit-border-radius: 0px 0px 4px 4px; margin-left: -4px; margin-top: -5px;">DOWNLOAD <span class="caret"></span></button><ul class="dropdown-menu" role="menu">' + downloadLinks + '</ul></div>');
					
					$('#format').change(function(){
						var mediaExt = $(this).attr('value');

						var mediaOriginalBigFormatComplete = fileNameBig.split('.');
						var mediaOriginalBigFormat = mediaOriginalBigFormatComplete[1];
						
						var mediaOriginalMediumFormatComplete = fileNameMedium.split('.');
						var mediaOriginalMediumFormat = mediaOriginalMediumFormatComplete[1];
						
						if(mediaType[1] != 'video'){
							var mediaOriginalSmallFormatComplete = fileNameSmall.split('.');
							var mediaOriginalSmallFormat = mediaOriginalSmallFormatComplete[1];
						}
						
						if(mediaType[1] == 'video'){
							var downloadLinks = '<li><a href="' + mediaUrlBig + '" id="download-big" download="' + fileNameBig.replace(mediaOriginalBigFormat, mediaExt) + '">Big size</a></li><li><a href="' + mediaUrlMedium + '" id="download-low-quality" download="' + fileNameMedium.replace(mediaOriginalMediumFormat, mediaExt) + '">Medium size</a></li>';
						}else{
							var downloadLinks = '<li><a href="' + mediaUrlBig + '" id="download-big" download="' + fileNameBig.replace(mediaOriginalBigFormat, mediaExt) + '">Big size</a></li><li><a href="' + mediaUrlMedium + '" id="download-low-quality" download="' + fileNameMedium.replace(mediaOriginalMediumFormat, mediaExt) + '">Medium size</a></li><li><a href="' + mediaUrlSmall + '" id="download-low-quality" download="' + fileNameSmall.replace(mediaOriginalSmallFormat, mediaExt) + '">Small size</a></li>';
						}
						
						$('.download_link').html('<div class="btn-group"><button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" style="width: 199px; -webkit-border-radius: 0px 0px 4px 4px; margin-left: -4px; margin-top: -5px;">DOWNLOAD <span class="caret"></span></button><ul class="dropdown-menu" role="menu">' + downloadLinks + '</ul></div>');
					});
					
					
					
				},
				error: function (data) {
					$('#load').hide();
					$('#error').show();
					if( data.statusText == 'Not Found' ){
						$( '#error').html('Image or video not found');
					}else{
						$('#error').html(data.statusText);
					}
				}
			});
		}catch( e ){
			$( '#error' ).show();
			$( '#error' ).html('An error has occurred!');
		}
	}
	
	chrome.tabs.getSelected(null, function(tab) {
		if(isValid(tab.url)){
			$( '#error' ).hide();
			$( '#load' ).show();
			setMediaInfo(tab.url);
		}else{
			$('#error').show();
			$('#error').html('Be on a page of any photo or video from Instagram to generate automatically download!');
		}
	});
	
	$('#generate-by-url').click(function(){
		var generateByUrl = $('#user-or-url').attr('value');
		if(generateByUrl != ''){
			$('#media_info').html(' ');
			if(isValid(generateByUrl)){
				$('.default-font').hide();
				$('#instagram-options').css('margin-bottom', 5);
				$( '#error' ).hide();
				$( '#load' ).show();
				setMediaInfo(generateByUrl);
			}else{
				$('#instagram-options').css('margin-bottom', 5);
				$('.default-font').hide();
				$('#error').show();
				$('#error').html('This URL isn\'t invalid!');
			}
		}
	});
	
	$('#list-all-medias').click(function(){
		var user = $('#user-or-url').attr('value');
		if(user != ''){
			chrome.tabs.create({
				"url": "/download_all_photos.html?user=" + user,
				"active": true
			});
		}else{
			$('#instagram-options').css('margin-bottom', 5);
			$('.default-font').hide();
			$('#error').show();
			$('#error').html('This username is empty!');
		}
	});
	
	$('#report-bug').click(function(){
		chrome.tabs.create({
			"url": "https://docs.google.com/forms/d/18dwrweCIqfDBwZF1ewOTUHBm0HeDlVYfMTUi19VGBio/viewform",
			"active": true
		});
	});
	
	$('#developer').click(function(){
		chrome.tabs.create({
			"url": "http://twitter.com/gabrieljmj",
			"active": true
		});
	});
	
	$('#size-examples').click(function(){
		chrome.tabs.create({
			"url": "/sizeexamples.html",
			"active": true
		});
	});
});