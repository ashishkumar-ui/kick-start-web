/**
 * @file Template manager
 * @author Ashish Kumar
 */

(function (window, BCG, $, undefined) {
	"use strict";
	BCG.templateMgr = (function () {
		function TemplateMgr() {

		    var _self = this;

		    // public vars
			this.rawTemplates ={};
			this.compiledTemplates ={};
			this.partials ={};		
			
			this.init = function () {
				
				
				/* read all partials definition and complie them to store */							
				$('[type="text/dot-partial"]').each(function(index) {
					var $this=$(this),
						partialId=$this.data("partialid");
						
					if(!_self.partials[partialId]){
					    _self.partials[partialId] = $this.html();
						$this.remove();
					}
				});
				
				
				/* read all template definition and complie them to store */							
				$('[type="text/dot-template"]').each(function(index) {
					var $this=$(this),
						templateId=$this.data("templateid");
						
					if(!_self.compiledTemplates[templateId]){
					    _self.compiledTemplates[templateId] = doT.template($this.html(), undefined, _self.partials);
						$this.remove();
					}
				});
				
			};

			this.loadTemplates = function (options) {
			    /*
				var options = {
					url: "",
					targetElm: "",
					data: data,
					callback: function(){}
				};
				*/

			    if (options.url) {
			        $.get(options.url, function (resp) {
			            var template = $(resp);
			            $(template).each(function (index) {
			                var $this = $(this),
                                templateId = $this.data("templateid"),
			                    partialId = $this.data("partialid");

			                if (partialId) {
			                    if (!_self.partials[partialId]) {
			                        _self.partials[partialId] = $this.html();
			                        $this.remove();
			                    }
			                }
			                if (templateId) {
			                    if (!_self.compiledTemplates[templateId]) {
			                        _self.compiledTemplates[templateId] = doT.template($this.html(), undefined, _self.partials);
			                        $this.remove();
			                    }
			                }
			            });

			            // Trigger Callback
			            if (options.callback) {
			                options.callback();
			            }
			        });
			    }
			};
		}
		return new TemplateMgr();
	}());
	
	//Invoke
	BCG.templateMgr.init();
	
}(window, BCG, $));