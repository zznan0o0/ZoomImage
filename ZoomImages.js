var ZoomImages = function(elems){
  this.elems = elems;
  this.init();
}

ZoomImages.prototype = {
  constructor: ZoomImages,

  init: function(){
    this.eachBindEvent();
  },

  createContent: function(src){
    var html = '<div class="ZoomImages_ImageDiv"><div class="ZoomImages_ImageDiv_div"><div class="ZoomImages_OFF">×</div><img class="ZoomImages_img" src="' + src + '"></div></div><div class="ZoomImages_mask"></div>';
    return this.createHtml(html);
  },

  eachBindEvent: function(){
    var _this = this;
    for(var i = 0; i < this.elems.length; i++){
       this.elems[i].onclick = null;
       this.elems[i].onclick = function(){
         _this.elemArr = _this.createContent(this.src);
         _this.elemArr[3].onload = function(){
           var wh = this.width / this.height;
           if(window.innerWidth - 42 < this.width){
             this.width = window.innerWidth - 42;
             this.height = this.width / wh;
           }

           if(window.innerHeight - 42 < this.height){
             this.height = window.innerHeight - 42;
             this.width = this.height * wh;
           }

           _this.elemArr[0].style.left = (window.innerWidth - this.width - 42) / 2 + 'px';
           _this.elemArr[0].style.top = (window.innerHeight - this.height - 42) / 2 + 'px';
           document.body.appendChild(_this.elemArr[0]);
           document.body.appendChild(_this.elemArr[4]);
           _this.elemArr[0].style.animation = "animateIn 0.4s";
          //  setTimeout(function(){
          //    _this.elemArr[0].style.transform = "scale(1, 1)"
          //  }, 20);

         }

         _this.elemArr[2].onclick = null;
         _this.elemArr[2].onclick = function(){
           _this.elemArr[2].onclick = null;
           document.body.removeChild(_this.elemArr[0]);
           document.body.removeChild(_this.elemArr[4]);
         }
       }
    }
  },

  createHtml: function(html){
    var div = document.createElement('div');
    div.innerHTML = html;
    var arr = div.getElementsByTagName('*');
    var arr2 = []
    for (var i = 0; i < arr.length; i++) {
      arr2.push(arr[i]);
    }
    return arr2;
  }
}
