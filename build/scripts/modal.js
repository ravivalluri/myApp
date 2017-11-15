$(document).ready(function(){
    
      // MODAL
      var modalText = {
        beam: {
          title: 'Beam Suntory',
          tag: 'Front-end Developer',
          detail: 'Creating modular components with Webpack, JSX and CSS Modules. Worked closely with the design and UX team to build out HTML emails, landing pages, and full-fledged responsive websites. Developed prototypes for new CRM software using Zurbs Foundation, SASS, and Backbone.js. Created and implemented a custom CSS grid system, with CSS media queries for mobile responsiveness.',
          link: 'http://www.beamsuntory.com'
        },
        grainger: {
          title: 'W.W. GRAINGER',
          tag: 'Full Stack Developer',
          detail: 'Designed and developed dynamic web pages using HTML5, CSS3, and JavaScript. UI dynamic styling, layout, validation and look and feel using Jquery and JavaScript. Developed applications in AngularJS and Bootstrap and deployed into development, Test, and production environment successfully. Maintained 24/7 high volume availability demands using open source tools such as Linux, Apache, PHP, and MySQL.',
        },
        aig: {
          title: 'AIG',
          tag: 'Full Stack Developer',
          detail: 'Created HTML, CSS, JavaScript (ES7), DHTML pages for Presentation Layer. Involved in developing of design documents with UML class diagrams. Developed a dynamic and secure front-end that consumes our API using Angular.js. Participated in development of a well responsive single page application using ReactJS framework and JavaScript in conjunction with HTML5, CSS3 standards, with front end UI team.',
        },
        bms: {
          title: 'BMS (BRISTOL- MYERS SQUIBB)',
          tag: 'Full Stack Developer',
          detail: '•	Demonstrated implementation and up-gradation of JavaScript Library. Coded frontend interface with Bootstrap, AngularJS, CSS, JS and HTML5. Created forms to collect and validate data from the user in HTML5 and ReactJS. Using Maven to build binary dependencies that give faster build time than typical monolithic Ant builds.',
        },
        tiaa: {
          title: 'TIAA-CREF',
          tag: 'Java Developer/Intern',
          detail: 'Developing and implementing the MVC Architectural Pattern using Struts Framework including JSP, Servlets, EJB, Form Bean and Action classes. Worked with the SQL mapping files in the Hibernate framework. Using Maven for fixing mismatched dependencies, badly written poms, and doing package exclusions anyway.',
        },
        wells: {
            title: 'WELLSFARGO',
            tag: 'Java Developer/Intern',
            detail: 'Developed SOAP-based requests for communicating with Web Services. Interfaced with struts to code the business logic for the web client layer involving J2EE design patterns. Used JMS for getting transaction details. Analyzed and fixed defects in the Login application.',
        }
      };
    
      $('#gallery .button').on('click', function(){
        fillModal(this.id);
        $('.modal-wrap').addClass('visible');
      });
    
      $('.close').on('click', function(){
        $('.modal-wrap, #modal .button').removeClass('visible');
      });
    
      $('.mask').on('click', function(){
        $('.modal-wrap, #modal .button').removeClass('visible');
      });
    
      var carousel = $('#carousel'),
          slideWidth = 700,
          threshold = slideWidth/3,
          dragStart, 
          dragEnd;
    
      setDimensions();
    
      $('#next').click(function(){ shiftSlide(-1) })
      $('#prev').click(function(){ shiftSlide(1) })
    
      carousel.on('mousedown', function(){
        if (carousel.hasClass('transition')) return;
        dragStart = event.pageX;
        $(this).on('mousemove', function(){
          dragEnd = event.pageX;
          $(this).css('transform','translateX('+ dragPos() +'px)');
        });
        $(document).on('mouseup', function(){
          if (dragPos() > threshold) { return shiftSlide(1) }
          if (dragPos() < -threshold) { return shiftSlide(-1) }
          shiftSlide(0);
        });
      });
    
      function setDimensions() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
         slideWidth = $(window).innerWidth();
        }
        $('.carousel-wrap, .slide').css('width', slideWidth);
        $('.modal').css('max-width', slideWidth);
        $('#carousel').css('left', slideWidth * -1)
      }
    
      function dragPos() {
        return dragEnd - dragStart;
      }
    
      function shiftSlide(direction) {
        if (carousel.hasClass('transition')) return;
        dragEnd = dragStart;
        $(document).off('mouseup')
        carousel.off('mousemove')
                .addClass('transition')
                .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
        setTimeout(function(){
          if (direction === 1) {
            $('.slide:first').before($('.slide:last'));
          } else if (direction === -1) {
            $('.slide:last').after($('.slide:first'));
          }
          carousel.removeClass('transition')
          carousel.css('transform','translateX(0px)'); 
        },700)
      }
    
      function fillModal(id) {
        $('#modal .title').text(modalText[id].title);
        $('#modal .detail').text(modalText[id].detail);
        $('#modal .tag').text(modalText[id].tag);
        if (modalText[id].link) $('#modal .button').addClass('visible')
                                                   .parent()
                                                   .attr('href', modalText[id].link)
    
        $.each($('#modal li'), function(index, value ) {
          $(this).text(modalText[id].bullets[index]);
        });
        $.each($('#modal .slide'), function(index, value) {
          $(this).css({
            background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
            backgroundSize: 'cover'
          });
                  
        });
      }
    })