var TINY={};

function tid(i){ return document.getElementById(i); }
function tag(e,p){ p=p||document; return p.getElementsByTagName(e); }

TINY.slideshow=function(n){
	this.infoSpeed=this.imgSpeed=this.speed=10;
	this.thumbOpacity=this.navHover=70;
	this.navOpacity=25;
	this.scrollSpeed=5;
	this.letterbox='#000';
	this.n=n;
	this.c=0;
	this.a=[]
};

TINY.slideshow.prototype={
	init:function(s,z,b,f,q){
		this.s=s=tid(s);
		var m= tag('li',s), i=0, w=0;
		this.l=m.length;
		this.q=tid(q);
		this.f=tid(z);
		this.r=tid(this.info);
		this.o=parseInt(TINY.style.val(z,'width'));
		
		if(this.thumbs){
			var u=tid(this.left), r=tid(this.right);
			u.onmouseover=new Function('TINY.scroll.init("'+this.thumbs+'",-1,'+this.scrollSpeed+')');
			u.onmouseout=r.onmouseout=new Function('TINY.scroll.cl("'+this.thumbs+'")');
			r.onmouseover=new Function('TINY.scroll.init("'+this.thumbs+'",1,'+this.scrollSpeed+')');
			this.p=tid(this.thumbs)
		}
		
		for(i;i<this.l;i++){
			this.a[i]={};
			var h=m[i], a=this.a[i];			
			a.t= tag('h3',h)[0].innerHTML;
			a.io = tag('h3',h)[0].style.opacity;
			a.d= tag('p',h)[0].innerHTML;
			a.l= tag('a',h)[0]? tag('a',h)[0].href:'';
			a.tg = tag('a',h)[0] != '' ? tag('a',h)[0].target:'_self';
			a.p= tag('span',h)[0].innerHTML;
			if(this.thumbs){
				var g = tag('img',h)[0];
				this.p.appendChild(g);
				w+=parseInt(g.offsetWidth);
				if(i!=this.l-1){
					g.style.marginRight=this.spacing+'px';
					w+=this.spacing
				}
				this.p.style.width=w+'px';
				g.style.opacity=this.thumbOpacity/100;
				g.style.filter='alpha(opacity='+this.thumbOpacity+')';
				g.onmouseover=new Function('TINY.alpha.set(this,100,5)');
				g.onmouseout=new Function('TINY.alpha.set(this,'+this.thumbOpacity+',5)');
				g.onclick=new Function(this.n+'.pr('+i+',1)');
			}
		}
		if(b&&f){
			b=tid(b);
			f=tid(f);
			b.style.opacity=f.style.opacity=this.navOpacity/100;
			b.style.filter=f.style.filter='alpha(opacity='+this.navOpacity+')';
			b.onmouseover=f.onmouseover=new Function('TINY.alpha.set(this,'+this.navHover+',5)');
			b.onmouseout=f.onmouseout=new Function('TINY.alpha.set(this,'+this.navOpacity+',5)');
			b.onclick=new Function(this.n+'.mv(-1,1)');
			f.onclick=new Function(this.n+'.mv(1,1)');
		}
		this.auto?this.is(0,0):this.is(0,1);
	},
	mv:function(d,c){
		this.direction = (d == 1) ? 'f' : 'b';
		var t=this.c+d;
		this.c=t=t<0?this.l-1:t>this.l-1?0:t;
		this.pr(t,c)
	},
	pr:function(t,c){		
		clearTimeout(this.lt);
		if(c){
			clearTimeout(this.at)
		}
		this.c=t;
		this.is(t,c)
	},
	is:function(s,c){	
		if(this.info) {					
			if (this.a[s].t.length > 0 || this.a[s].d.length > 0) {			
				TINY.height.set(this.r,1,this.infoSpeed/2,-1);
			} else {			
				TINY.height.set(this.r,0,this.infoSpeed/2,-1);
			}
		}
		
		var i=new Image();
		if (this.effect == "fade") {
			//i.style.opacity=0;
			//i.style.filter='alpha(opacity=0)';
			i.style.display = 'none';
		}
		
		this.i=i;
		i.onload=new Function(this.n+'.le('+s+','+c+')');
		string = this.a[s].p;
		string = string.replace(/&amp;/g, '&');
		i.src = string;
		i.id = this.imagesid + 'img' + s;
		if(this.thumbs){
			var a= tag('img',this.p), l=a.length, x=0;
			for(x;x<l;x++){
				a[x].style.borderColor=x!=s?'':this.active
			}
		}
	},
	mi:function(oi, i) {		
		opos = jQuery(oi).position();
		oposl = opos.left;
		opost = opos.top;
		ow = jQuery(oi).width();
		oh = jQuery(oi).height();
		
		pos = jQuery(i).position();
		posl = pos.left;
		post = pos.top;
		w = jQuery(i).width();
		h = jQuery(i).height();
		
		speed = (this.imgSpeed * 100);
			
		if (jQuery(oi).attr('src') != jQuery(i).attr('src')) {
			if (this.direction == "f") {	
				if (this.slide_direction == "tb") {
					jQuery(i).css('top', (h + opost)).animate({
					"top": "0px"
					}, {
						duration: speed,
						easing: this.easing,
						step: function(now, fx) {
							jQuery(oi).css('top', '-' + (oh - now) + 'px');
						}
					});
				} else {
					jQuery(i).css('left', (w + oposl)).animate({"left": "0px"}, {
						duration: speed,
						easing: this.easing,
						step: function(now, fx) {
							jQuery(oi).css('left', '-' + (ow - now) + 'px');
						}
					});	
				}
			} else if (this.direction == "b") {	
				if (this.slide_direction == "tb") {
					newpos = -(w - opost);							
					jQuery(i).css('top', newpos).animate({"top": "0px"}, {
						duration: speed,
						easing: this.easing,
						step: function(now, fx) {
							jQuery(oi).css('top', '+' + (oh + now) + 'px');
						}
					});
				} else {
					newpos = -(w - oposl);							
					jQuery(i).css('left', newpos).animate({"left": "0px"}, {
						duration: speed,
						easing: this.easing,
						step: function(now, fx) {
							jQuery(oi).css('left', '+' + (ow + now) + 'px');
						}
					});
				}
			}
		}
	},
	oi:function(oi, i) {
		speed = (this.imgSpeed * 100);
		
		jQuery(oi).fadeOut({
			duration: speed,
			easing: this.easing
		});
		
		jQuery(i).fadeIn({
			duration: speed,
			easing: this.easing
		});
	},
	le:function(s,c){		
		this.f.appendChild(this.i);
		var w=this.o-parseInt(this.i.offsetWidth);
		if(w>0){
			var l=Math.floor(w/2);
		}
		
		var m= tag('img',this.f);
		if (this.effect == "fade") {
			//TINY.alpha.set(this.i,100,this.imgSpeed);
			this.oi(m[(m.length - 2)], this.i);
		} else {
			if (m.length > 1) {
				this.mi(m[(m.length - 2)], this.i);
			}	
		}
		
		var n=new Function(this.n+'.nf('+s+')');
		this.lt=setTimeout(n,this.imgSpeed*100);
		if(!c || (this.auto == true && this.alwaysauto == true)) {
			this.at=setTimeout(new Function(this.n+'.mv(1,0)'),this.speed*1000)
		}
		
		if (this.autoheight == true) {
			TINY.height.set(this.f.parentNode,(jQuery(this.i).height()),this.infoSpeed/2,-1);
		}
		
		if(this.a[s].l != ""){			
			var baseURL = this.a[s].l;
			var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
	   		var urlType = baseURL.toLowerCase().match(urlString);
	   		var unique= jQuery(this.s).attr('id');			

			if (this.imagesthickbox == "true" && (urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp')) {			
				//this.q.onclick = new Function('jQuery.colorbox({href:"' + this.a[s].l + '",maxWidth:"90%",maxHeight:"90%",title:"' + this.a[s].t + '"})');
				this.q.onmouseover = new Function('this.className="' + this.linkclass + '"; this.href = "' + this.a[s].l + '";');
				var uniqueimglinkid = jQuery('a[href="' + this.a[s].l + '"]').attr('id');
				this.q.onclick = new Function('jQuery(".colorbox").colorbox({rel:"' + unique + 'overlay", maxWidth:"90%", maxHeight:"90%"}); jQuery("#' + uniqueimglinkid + '").click(); return false;');
			} else {
				this.q.onmouseover = new Function('this.className="' + this.linkclass + '";');
				this.q.onclick = new Function('window.open("' + this.a[s].l + '","' + this.a[s].tg + '"); return false;');
			}
			
			this.q.onmouseout = new Function('this.className=""');
			this.q.style.cursor = 'pointer';
		}else{
			this.q.onclick=this.q.onmouseover=null;
			this.q.style.cursor='default';
		}
		var m= tag('img',this.f);
		if(m.length > 10){
			this.f.removeChild(m[0])
		}
	},
	nf:function(s){
		if(this.info){				
			s=this.a[s];			
			tag('h3',this.r)[0].innerHTML=s.t;
			tag('p',this.r)[0].innerHTML=s.d;
			this.r.style.height='auto';
			var h=parseInt(this.r.offsetHeight);
			this.r.style.height=0;
			
			if (s.t.length > 0 || s.d.length > 0) {			
				TINY.height.set(this.r,h,this.infoSpeed,0);
				TINY.alpha.set(this.r,s.io,5);
			}
		}
	}
};

TINY.scroll=function(){
	return{
		init:function(e,d,s){
			e=typeof e=='object'?e: tid(e); var p=e.style.left||TINY.style.val(e,'left'); e.style.left=p;			
			var l = (d==1) ? Math.abs(parseInt(e.offsetWidth)-parseInt(e.parentNode.offsetWidth)) : 0;
			
			if ((e.childNodes.length+1)*e.firstChild.width > e.parentNode.offsetWidth) {
				e.si=setInterval(function(){
					TINY.scroll.mv(e,l,d,s)},20);
			}
		},
		mv:function(e,l,d,s){
			var c=parseInt(e.style.left); if(c==l){TINY.scroll.cl(e)}else{var i=Math.abs(l+c); i=i<s?i:s; var n=c-i*d; e.style.left=n+'px'}
		},
		cl:function(e){e=typeof e=='object'?e: tid(e); clearInterval(e.si)}
	}
}();

TINY.height=function(){
	return{
		set:function(e,h,s,d){
			e=typeof e=='object'?e:tid(e); var oh=e.offsetHeight, ho=e.style.height||TINY.style.val(e,'height');
			ho=oh-parseInt(ho); var hd=oh-ho>h?-1:1; clearInterval(e.si); e.si=setInterval(function(){TINY.height.tw(e,h,ho,hd,s)},20)
		},
		tw:function(e,h,ho,hd,s){
			var oh=e.offsetHeight-ho;
			if(oh == h){clearInterval(e.si)}else{if(oh!=h){e.style.height=oh+(Math.ceil(Math.abs(h-oh)/s)*hd)+'px'}}
		}
	}
}();

TINY.alpha=function(){
	return{
		set:function(e,a,s){
			e=typeof e=='object'?e:tid(e); var o=e.style.opacity||TINY.style.val(e,'opacity'),
			d=a>o*100?1:-1; e.style.opacity=o; clearInterval(e.ai); e.ai=setInterval(function(){TINY.alpha.tw(e,a,d,s)},20)
		},
		tw:function(e,a,d,s){
			var o=Math.round(e.style.opacity*100);
			if(o==a){clearInterval(e.ai)}else{var n=o+Math.ceil(Math.abs(a-o)/s)*d; e.style.opacity=n/100; e.style.filter='alpha(opacity='+n+')'}
		}
	}
}();

TINY.style=function(){return{val:function(e,p){e=typeof e=='object'?e:tid(e); return e.currentStyle?e.currentStyle[p]:document.defaultView.getComputedStyle(e,null).getPropertyValue(p)}}}();