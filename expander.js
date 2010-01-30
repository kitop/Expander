/*
Expander
Expand and Contract text from DOM, using Prototype JS Library
Based on Textpand and jQuery's Expander

Expander.version = '0.1'
2010 - Esteban Pastorino - http://github.com/kitop

Use it and modify it as you wish

ToDo:
  - check html tags when collapsing text and close them properly (as on jQuery's)
  - add posible effects form expanding/collapsing
  - add posible callbacks
  - give some margin on the maxChars limit (for not collapsing when there are x more chars tan maxChars)
  - adding option for collapse text once expanded
*/

var Expander = (function(){
	var Expander = Class.create();
	
	Expander.options = {
		maxChars: 255, //max chars showed on collapsed text - not including initial/trailing spaces
		expandPrefix: '... ', //what to append the collapsed text
		expandText: 'more', //text in the expanding link
		collapsePrefix: ' ', //what to append the expanding text
		collapseText: 'less', //text in the collapsing link
	};
	
	// Instance methods
	Expander.prototype = {
		initialize: function(el, options) {
			// INIT
			this.options = {};
			Object.extend(this.options, Expander.options);
			Object.extend(this.options, options || {});
			this.element = $(el);
			
			//setup shorted text
			var originalText = this.element.innerHTML.strip(); //don't consider the initial and final spaces
			if(originalText.length < this.options.maxChars){ return; }
		
			var startText = originalText.slice(0, this.options.maxChars);
			var endText = originalText.slice(startText.length);
			
			//expand part
			this._expandLink = new Element('a', {'href':'#'}).update(this.options.expandText);
			this._readMore = new Element('span', {'class':'read-more'}).update(this.options.expandPrefix).insert(this._expandLink);
			
			//collapse part
			this._collapseLink = new Element('a', {'href':'#'}).update(this.options.collapseText);
			this._reCollapse = new Element('span', {'class':'re-collapse'}).update(this.options.collapsePrefix).insert(this._collapseLink);
			
			this._details = new Element('span', {'class':'details'}).update(endText).insert(this._reCollapse);
			
			//update the original element
			this.element.update(startText).insert(this._readMore).insert(this._details);
			
			//add observers
			this._expandLink.observe('click', this._expandText.bind(this));
			this._collapseLink.observe('click', this._compactText.bind(this));
			
			//compact text at last
			this._compactText();
		},
		
		_compactText: function(e){
			this._details.hide();
			this._readMore.show();
			e && e.stop();
			return false;
		},
		
		_expandText: function(e){
			this._details.show();
			this._readMore.hide();
			e && e.stop();
			return false;
		}
	}
	
	return Expander;
})();
