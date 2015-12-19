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
                                    
                            $('#media-images').append('<div class="media-li"><img id="a' + totalMediasImages + '" src="' + imageUrl + '" width="306" height="306" style="background: url(\'content/images/load-2.gif\') no-repeat center;" /><div class="button-download"><button class="btn btn-success select-img" id="c' + totalMediasImages + '" style="-webkit-border-radius: 4px 0px 0px 4px;">SELECT</button><a href="' + imageUrl +'" download="' + imageName + '"><button class="btn btn-success" style="-webkit-border-radius: 0px 4px 4px 0px;">DOWNLOAD</button></a></div><canvas style="display: none;" width= "612" height="612" id="canvas' + totalMediasImages + '"></canvas></div>');
                        }   
                        if(typeof data.data[i].videos != 'undefined'){
                            
                            var videoUrl = data.data[i].videos.standard_resolution.url;
                            var videoNameComplete = videoUrl.split('/');
                            var videoName = videoNameComplete[3];
                                    
                            $('#media-videos').append('<div class="media-li"><video width="306" height="306" controls><source src="' + videoUrl + '" type="video/mp4"></video><div class="button-download"><a href="' + videoUrl + '" download="' + videoName + '"><button class="btn btn-success" style="-webkit-border-radius: 0px 4px 4px 0px;">DOWNLOAD</button></a></div><canvas style="display: none;" width= "612" height="612" id="canvasVideo' + totalMediasImages + '"></canvas></div>');
                        }
                    }
                    $('#totalMediasImages').html(totalMediasImages);
                    return moreMedia(nextUrl);
                }
            }
        });
    }
    
    if(typeof jsGet('user') != 'undefined' || jsGet('user') != ''){
        $.ajax({
            type: 'GET',
            url: 'https://api.instagram.com/v1/users/search',
            data: {
                q: jsGet('user'),
                client_id: '0b77c4f6e9894c9c957ffdbc8051bcdd'
            },
            dataType: "jsonp",
            error: function(data){
                alert(data.statusText);
            },
            success: function( data ){
                if(data.data.length == 0){
                    $('#error-images').show();
                    $('#error-videos').show();
                    $('#load').hide();
                    $('#ready-imgs').hide();
                    $('#error-images').html('This user doesn\'t exist');
                    $('#error-videos').append('<br />This user doesn\'t exist');
                    $('#user-photo').html('<img src="content/images/profile-img.jpg" height="50" />');
                    $('.text-link-user').html('<b>Undefined</b>');
                    $('#creating-zip').hide();
                }else{
                    var user_id = data.data[0].id;
                    var profilePicture = data.data[0].profile_picture;
                    $('#user-photo').html('<img src="' + profilePicture + '" height="50" />');
                    $('.text-link-user').html('@' + jsGet('user') + '<br /><a href="http://instagram.com/' + jsGet('user') + '"<span class="label label-primary" style="background-color: #428bca;">View profile</span></a>');
                    $.ajax({
                        type: "GET",
                        url: 'https://api.instagram.com/v1/users/' + user_id + '/media/recent/',
                        data: {
                            access_token: '243029514.5b9e1e6.0b488c6d2bc94c85943f91ed329ae49c'
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
                                $('#error-videos').append('<br />This user hasn\'t videos');
                                $('#ready-imgs').hide();
                                $('#creating-zip').hide();
                            }
                            
                            for(var i = 0; i < data.data.length; i++){
                                if(typeof data.data[i].images != 'undefined'){
                                    totalMediasImages += 1;
                                    var imageUrl = data.data[i].images.standard_resolution.url;
                                    var imageNameComplete = imageUrl.split('/');
                                    var imageName = end(imageNameComplete);
                                    
                                    $('#media-images').append('<div class="media-li" id="photo' + totalMediasImages + '"><img id="a' + totalMediasImages + '" src="' + imageUrl + '" width="306" height="306" style="background: url(\'content/images/load-2.gif\') no-repeat center;" /><div class="button-download"><button class="btn btn-success select-img" id="c' + totalMediasImages + '" style="-webkit-border-radius: 4px 0px 0px 4px;">SELECT</button><a href="' + imageUrl +'" download="' + imageName + '"><button class="btn btn-success" style="-webkit-border-radius: 0px 4px 4px 0px;">DOWNLOAD</button></a></div><canvas style="display: none;" width= "612" height="612" id="canvas' + totalMediasImages + '"></canvas></div>');
                                }else{
                                    $('#error-images').show();
                                    $('#error-images').html('This user hasn\'t images');
                                    $('#blob-button-images').attr('disabled', 'disabled');
                                    $('#blob-button-images-selecteds').attr('disabled', 'disabled');
                                }
                                
                                $('#totalMediasImages').html(totalMediasImages);
                            }
                            
                            moreMedia(nextUrl);
                            
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
                            
                            setTimeout(function getDownloadZip(){
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
                                
                                $('#creating-zip').hide();
                                
                                $('#blob-button-images').removeAttr('disabled');
                                $('#blob-button-images-selecteds').removeAttr('disabled');
                            }, 30000);
                        }
                    });
                }
            }
        });
    }
    
    tabs();
    
});