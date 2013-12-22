$(document).ready(function(){
	var totalMedias = 0;
	var totalMediasImages = 0;
	
	function moreMedia(url){
		$.ajax({
			type: "GET",
			url: url,
			dataType: "jsonp",
			success: function( data ){
			var nextUrl = data.pagination.next_url;
			if(typeof nextUrl == 'undefined'){
				$('#load').hide();

			}else{
				for(var i = 1; i < data.data.length; i++){
					if(typeof data.data[i].images != 'undefined'){
						totalMediasImages += 1;
						var imageUrl = data.data[i].images.standard_resolution.url;
						var imageNameComplete = imageUrl.split('/');
						var imageName = end(imageNameComplete);
								
						$('#media-images').append('<div class="media-li"><img id="a' + totalMediasImages + '" src="' + imageUrl + '" width="306" height="306" style="background: url(\'content/images/load-2.gif\') no-repeat center;" /><div class="button-download"><button class="btn btn-success select-img" id="c' + totalMediasImages + '">SELECT</button><a href="' + imageUrl +'" download="' + imageName + '"><button class="btn btn-success">DOWNLOAD</button></a></div><canvas style="display: none;" width= "612" height="612" id="canvas' + totalMediasImages + '"></canvas></div>');
					}	
				}
					$('#totalMediasImages').html(totalMediasImages);
					return moreMedia(nextUrl);
				}
			}
			
		});
	}
	
	if(typeof jsGet('tag') != 'undefined' || jsGet('tag') != ''){
		$.ajax({
			type: "GET",
			url: 'https://api.instagram.com/v1/tags/' + jsGet('tag') + '/media/recent',
			data: {
				access_token: '243029514.84b3fa3.367a4d2f70274f2bb4aa41824a558e92'
			},
			dataType: "jsonp",
			success: function( data ){
				var nextUrl = data.pagination.next_url;
				if(typeof nextUrl == 'undefined'){
					$('#load').hide();
				}
				if(data.data.length == 0){
						$('#error-images').show();
						$('#error-images').html('This user hasn\'t photos');
						$('#blob-button-images').attr('disabled', 'disabled');
						$('#blob-button-images-selecteds').attr('disabled', 'disabled');
						$('#blob-button-videos').attr('disabled', 'disabled');
						$('#blob-button-videos-selecteds').attr('disabled', 'disabled');
						$('#error-videos').show();
								$('#error-videos').html('This user hasn\'t videos');
				}
				for(var i = 1; i < data.data.length; i++){
					if(typeof data.data[i].images != 'undefined'){
						totalMediasImages += 1;
						var imageUrl = data.data[i].images.standard_resolution.url;
						var imageNameComplete = imageUrl.split('/');
						var imageName = end(imageNameComplete);
								
								$('#media-images').append('<div class="media-li" id="photo' + totalMediasImages + '"><img id="a' + totalMediasImages + '" src="' + imageUrl + '" width="306" height="306" style="background: url(\'content/images/load-2.gif\') no-repeat center;" /><div class="button-download"><button class="btn btn-success select-img" id="c' + totalMediasImages + '" style="-webkit-border-radius: 4px 0px 0px 4px;">SELECT</button><a href="' + imageUrl +'" download="' + imageName + '"><button class="btn btn-success" style="-webkit-border-radius: 0px 4px 4px 0px;">DOWNLOAD</button></a></div><canvas style="display: none;" width= "612" height="612" id="canvas' + totalMediasImages + '"></canvas></div>');
								
							}else{
								$('#error-images').show();
								$('#error-images').html('This user hasn\'t images');
							}
							
							$('#totalMediasImages').html(totalMediasImages);
						}
						moreMedia(nextUrl);
						
						$('.sr-only').html('Reading images');
						$('#load').show();
						
						$('#countdown').html('20');
						countdown('#countdown');
						
						setTimeout(function getDownloadZip(){
							$('#blob-button-images').removeAttr('disabled');
							var zip = new JSZip();
							for(i = 1; i <= $('#totalMediasImages').html(); i++){
								var c = document.getElementById('canvas' + i);
								var ctx = c.getContext("2d");
								var img = document.getElementById("a" + i);
								ctx.drawImage(img, 0, 0);
								var dataURL = c.toDataURL("image/jpg");
								var urlEncoded = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
								var fileNameComplete = $('#a' + i).attr('src');
								var fileNameSeparate = fileNameComplete.split('/');
								var fileName = end(fileNameSeparate);
									
								zip.file(fileName, urlEncoded, {base64: true});
							}
							var blobLink = document.getElementById('blob-img');
							blobLink.download = jsGet('user') + '.zip';
							blobLink.href = window.URL.createObjectURL(zip.generate({type:"blob"}));		
							
							var ids = new Array();
							$('.select-img').on('click', function(){
								var idComplete = $(this).attr('id');
								var id = idComplete.replace('c', '');
								if(verifyIfElementExists(ids, id)){
									$(this).html('SELECT');
									ids = $.grep(ids, function(val, index){
										return val != id;
									});
									$('#photo' + id).css('background', 'none');
								}else{
									$(this).html('UNSELECT');
									$('#photo' + id).css('background', '#ccc');
									ids.push(id);
								}
							});
								
							$('#blob-button-images-selecteds').click(function(){
								if(ids.length == 0){
									alert('Select some photo to download');
									return false;
								}else{
									var zip = new JSZip();
									for(i = 0; i < ids.length; i++){
										var c = document.getElementById('canvas' + ids[i]);
										var ctx = c.getContext("2d");
										var img = document.getElementById("a" + ids[i]);
										ctx.drawImage(img, 0, 0);
										var dataURL = c.toDataURL("image/jpg");
										var urlEncoded = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
										var fileNameComplete = $('#a' + ids[i]).attr('src');
										var fileNameSeparate = fileNameComplete.split('/');
										var fileName = end(fileNameSeparate);
										
										zip.file(fileName, urlEncoded, {base64: true});
									}
									var blobLink = document.getElementById('blob-img-selecteds');
									blobLink.download = jsGet('user') + '.zip';
									blobLink.href = window.URL.createObjectURL(zip.generate({type:"blob"}));
								}
							});
						}, 20000);
					}
				});
	}
	tabs();
	
});