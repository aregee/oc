'use strict';

describe('oc-client : renderUnloadedComponents', function(){

  var aComponent = {
    html: '<oc-component href="http://my-registry.com/v3/a-component/1.2.X/?name=John"></oc-component>',
    response: {
      href: 'http://my-registry.com/v3/a-component/1.2.X/?name=John',
      name: 'a-component',
      type: 'oc-component',
      version: '1.2.123',
      requestVersion: '1.2.X',
      data: {},
      template: {
        src: 'https://my-cdn.com/components/a-component/1.2.123/template.js',
        type: 'handlebars',
        key: '46ee85c314b371cac60471cef5b2e2e6c443dccf'
      },
      renderMode: 'unrendered'
    },
    view: 'oc.components=oc.components||{},oc.components["46ee85c314b371cac60471cef5b2e2e6c443dccf"]={compiler:[6,">= 2.0.0-beta.1"],main:function(){return"Hello world!"},useData:!0};'
  };

  var anotherComponent = {
    html: '<oc-component href="http://my-registry.com/v3/another-component/1.X.X/"></oc-component>',
    response: {
      href: 'http://my-registry.com/v3/another-component/1.X.X/',
      name: 'another-component',
      type: 'oc-component',
      version: '1.0.0',
      requestVersion: '1.X.X',
      data: {},
      template: {
        src: 'https://my-cdn.com/components/another-component/1.0.0/template.js',
        type: 'jade',
        key: '97f07144341a214735c4cec85b002c4c8f394455'
      },
      renderMode: 'unrendered'
    },
    view: 'oc.components=oc.components||{},oc.components["97f07144341a214735c4cec85b002c4c8f394455"]=function(c){var o=[];return o.push("<div>this is a component</div>"),o.join("")};'
  };

  var originalAjax = jQuery.ajax;

  var initialise = function(){
    jQuery.ajax = $.ajax = function(p){
      var isAnother = p.url.indexOf('another') > 0;
      p.success((isAnother ? anotherComponent : aComponent).response); 
    };

    sinon.stub(head, 'load').yields(null, 'ok');
    sinon.stub(console, 'log');  
    $('body').append(aComponent.html);
    $('body').append(anotherComponent.html);
    eval(aComponent.view);
    eval(anotherComponent.view);
  };

  var cleanup = function(){
    head.load.restore();
    console.log.restore();
    oc.events.reset();
    $('body').find('oc-component').remove();
    jQuery.ajax = $.ajax = originalAjax;
    delete oc.components;
    oc.renderedComponents = {};
  };
  
  describe('when rendering all unloaded components in page', function(){

    describe('when the rendering is done', function(){

      var calls, eventData;
      
      beforeEach(function(done){
        
        initialise();
        eventData = [];

        oc.events.on('oc:rendered', function(e, data){
          eventData.push(data);
          if(eventData.length === 2){
            done();
          }
        });

        oc.renderUnloadedComponents();
      });

      afterEach(cleanup);

      it('should fire an event for each rendered component', function(){
        expect(eventData.length).toEqual(2);
      });

      it('should include names and versions on fired events payload', function(){
        expect(eventData[0].name).toEqual('a-component');
        expect(eventData[0].version).toEqual('1.2.123');
        expect(eventData[1].name).toEqual('another-component');
        expect(eventData[1].version).toEqual('1.0.0');
      });
    });
  });
});