let window = {};// start of file

/**
	Settings
	These are the two global variables, _UI for,
	well, UI stuff, and anything that is not going
	to be saved or personalized.  _GP is all
	Glyphr Project settings, including font stuff
	and personalized stuff.  There are additional
	_UI properties declared in the event handler
	file.
**/

// These are NOT SAVED with the project
	var _UI = {

		// Version
		thisGlyphrStudioVersion: 'Version 1.12',
		thisGlyphrStudioVersionNum: '1.12.02',
		thisGlyphrStudioVersionDate: 0,

		// Internal Dev Stuff
		devmode: true, 					// global switch for all the stuff below
		dev_sample_project: 'californiagothic', 		// load a sample project and skip open project experience
		dev_current_page: 'glyph edit',		// navigate straight to a page
		dev_current_panel: false, 		// navigate straight to a panel
		dev_selected_shape: false, 		// automatically select a shape
		debug: true, 					// show messages sent to the browser console
		debugautogroup: false,			// try to console.group based on text strings
		debugtableobjects: false,		// Show objects in tables in the console
		coremode: false,				// Glyphr Studio Core is only the functionality, none of the UI
		telemetry: true,				// Load google analytics
		testactions:[
			{name: 'Flatten', onclick: 'getSelectedWorkItem().flattenGlyph(); history_put(\'flatten\'); redraw();'},
			{name: 'Combine', onclick: 'getSelectedWorkItem().combineAllShapes(true, true); history_put(\'combine\'); redraw();'},
			{name: 'Resolve', onclick: 'getSelectedWorkItem().resolveOverlapsForAllShapes(); history_put(\'resolve overlaps\');'},
			{name: 'CombRes', onclick: 'getSelectedWorkItem().combineAllShapes(true); history_put(\'combine and resolve\'); redraw();'},
			{name: 'Draw IX', onclick: 'getSelectedWorkItemShapes()[0].path.getPolySegment().drawIntersections();'}
		],
		testOnLoad: function() {},
		testOnRedraw: function() {},

		// all pages
		current_page: 'openproject',
		current_panel: false,
		last_panel: 'npChooser',
		hamburger:{
			state: 11,
			direction: -1,
			timeout: {}
		},
		projectsaved: true,
		stoppagenavigation: true,
		icons: {},
		cursors: {},
		colors: {

			// ACCENT BLUE
			blue: {
				l95: 'rgb(225,245,255)',
				l85: 'rgb(155,221,255)',
				l75: 'rgb(80,196,255)',
				l65: 'rgb(0,170,255)',		// Primary Accent
				l55: 'rgb(0,140,210)',
				l45: 'rgb(0,113,170)',
				l35: 'rgb(0,90,135)',
				l25: 'rgb(0,63,95)',
				l15: 'rgb(0,43,65)',
				l05: 'rgb(0,20,30)'
			},

			// ACCENT GREEN
			green: {
				l95: 'rgb(185,255,226)',
				l85: 'rgb(0,245,144)',
				l75: 'rgb(0,210,123)',
				l65: 'rgb(0,180,105)',
				l55: 'rgb(0,150,88)',
				l45: 'rgb(0,125,73)',
				l35: 'rgb(0,95,55)',
				l25: 'rgb(0,70,41)',
				l15: 'rgb(0,45,26)',
				l05: 'rgb(0,20,11)'
			},

			// COOL GRAYSCALE
			gray:{
				offwhite: 'rgb250,252,255)',	// Off White
				l90: 'rgb(229,234,239)',		// LIGHTER
				l80: 'rgb(204,209,214)',
				l70: 'rgb(178,183,188)',
				l60: 'rgb(153,158,163)',
				l65: 'rgb(153,158,163)',		// Fake for outline color
				l50: 'rgb(127,134,137)',
				l40: 'rgb(102,107,112)',
				l30: 'rgb(76,81,86)',
				l20: 'rgb(51,56,61)',
				l10: 'rgb(25,30,35)'			// DARKER
			},

			// RED FOR ERROR
			error: {
				light: 'rgb(240,210,215)',	// os red warning color light
				medium: 'rgb(240,15,54)',	// os red warning color
				dark: 'rgb(105,45,55)'	// os red warning color dark
			}
		},

		// Unicode ranges
		basiclatinorder: ['0x0041','0x0042','0x0043','0x0044','0x0045','0x0046','0x0047','0x0048','0x0049','0x004A','0x004B','0x004C','0x004D','0x004E','0x004F','0x0050','0x0051','0x0052','0x0053','0x0054','0x0055','0x0056','0x0057','0x0058','0x0059','0x005A','0x0061','0x0062','0x0063','0x0064','0x0065','0x0066','0x0067','0x0068','0x0069','0x006A','0x006B','0x006C','0x006D','0x006E','0x006F','0x0070','0x0071','0x0072','0x0073','0x0074','0x0075','0x0076','0x0077','0x0078','0x0079','0x007A','0x0030','0x0031','0x0032','0x0033','0x0034','0x0035','0x0036','0x0037','0x0038','0x0039','0x0021','0x0022','0x0023','0x0024','0x0025','0x0026','0x0027','0x0028','0x0029','0x002A','0x002B','0x002C','0x002D','0x002E','0x002F','0x003A','0x003B','0x003C','0x003D','0x003E','0x003F','0x0040','0x005B','0x005C','0x005D','0x005E','0x005F','0x0060','0x007B','0x007C','0x007D','0x007E','0x0020'],
	
		glyphrange: {
			'basiclatin': {'begin':0x0020, 'end':0x007E},
			'latinsupplimentcontrols': {'begin':0x0080, 'end': 0x009F},
			'latinsupplement': {'begin':0x00A0, 'end': 0x00FF},
			'latinextendeda': {'begin':0x0100, 'end':0x017F},
			'latinextendedb': {'begin':0x0180, 'end':0x024F}
		},

		// https://en.wikipedia.org/wiki/Typographic_ligature
		ligaturetounicode: {
			'ff': '0xFB00',
			'fi': '0xFB01',
			'fl': '0xFB02',
			'ft': '0xFB05',
			'ffi': '0xFB03',
			'ffl': '0xFB04'
		},
		
		// Shared edit pages
		popout: false,
		ms: {
			shapes: false,	//Selected Shapes
			points: false		//Selected Points
		},
		glyphchooser:{
			dropdown:false,
			panel:{
				fname:'selectGlyph',
				selected: 'basiclatin',
				choices:'glyphs'
			},
			dialog:{
				fname:'selectGlyph',
				selected: 'basiclatin',
				choices:'glyphs'
			},
			getshapesoptions:{
				srcAutoWidth: false,
				srcWidth: false,
				srcLSB: false,
				srcRSB: false
			},
			cache: false
		},
		canvashotspots: [],
		canvashotspothovering: false,
		multiselectthickness: 2,
		rotatehandleheight: 40,
		selectedtool: 'pathedit',	// pathedit, pathaddpoint, slice, shaperesize, pan, newrect, newoval, newpath
		focuselement: false,
		redrawing: false,
		redraw: {
			redrawcanvas: true,
			redrawtools: true,
			redrawpanels: true,
			calledby: ''
		},
		thumbsize: 50,
		thumbgutter: 5,
		showgrid: true,		// display the grid
		showguides: true,		// display guides
		showguidelabels: true,	// display guide labels
		showovershoots: true,	// display overshoot guides
		clipboardshape: false,
		glypheditcanvas: false,
		glypheditcanvassize: 2000,	// How big the viewport canvas is
		glypheditctx: false,
		ishereghostcanvas: false,
		ishereghostctx: false,
		defaultview: {
			dx: 200,		// X offset for the canvas origin
			dy: 500,		// Y offset for the canvas origin
			dz: 0.5,		// Zoom or scale of the canvas
		},
		views: {},		// Holds the unique views per char & component
		thumbview: {},
		mins: {
			xmax: -999999,
			xmin: 999999,
			ymax: -999999,
			ymin: 999999
		},
		maxes: {
			xmax: 999999,
			xmin: -999999,
			ymax: 999999,
			ymin: -999999
		},
		contextglyphs: {
			string: '',
			advancewidth: false,
			leftseq: false,
			rightseq: false
		},
		timeout: false,
		toasttimeout: false,
		history: {},
		combineprecision: 0.01,

		// page: glyphedit
		selectedglyph: false,	// f is 0x0066

		// page: ligatures
		selectedligature: false,

		// page: components
		selectedcomponent: false,

		// page: kerning
		selectedkern: false,
		defaultkernview: {
			dx: 500,		// X offset for the canvas origin
			dy: 500,		// Y offset for the canvas origin
			dz: 0.5,		// Zoom or scale of the canvas
		},
		guides: {
			leftgroup_xmax: {type:'vertical', 'location':0, name:'left group', color:'rgb(255,0,255)'},
			rightgroup_xmin: {type:'vertical', 'location':0, name:'right group', color:'rgb(255,0,255)'}
		},

		// page: test drive
		testdrive: {
			glyphseq: {},
			ctx: false,
			canvas: false,
			sampletext: '',
			fontscale: 100,
			fontsize: 48,
			linegap: false,
			padsize: 0,
			showglyphextras: false,
			showlineextras: false,
			showpageextras: false,
			flattenglyphs: false,
			cache:{}
		},

		// page: import svg
		selectedsvgimporttarget: false,
		importsvg: {
			scale: true,
			move: true,
			ascender: false,
			capheight: false,
			descender: false,
			overshoot_top: false,
			overshoot_bottom: false,
			svgcode: false,
		},

		// page: openproject
		droppedFileContent: false,
		overflowcount: 326,
		spinning: true,
		importrange: {
			begin: 0x0020,
			end: 0x024F
		},

		// page: export font
		fontmetrics: {
			numglyphs: 0,
			maxglyph: 0x20,
			maxes: {
				xmax: -999999,
				xmin: 999999,
				ymax: -999999,
				ymin: 999999
			}
		},
		notdefglyphshapes: '[{"objtype":"shape","name":"Outer Phi Rectangle","path":{"objtype":"path","pathpoints":[{"objtype":"pathpoint","P":{"objtype":"coord","x":0,"y":700,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":432,"y":700,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":432,"y":0,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":0,"y":0,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false}],"winding":-4,"maxes":{"xmax":432,"xmin":0,"ymax":700,"ymin":0}},"visible":true,"xlock":false,"ylock":false,"wlock":false,"hlock":false,"ratiolock":false},{"objtype":"shape","name":"Inner Phi Rectangle","path":{"objtype":"path","pathpoints":[{"objtype":"pathpoint","P":{"objtype":"coord","x":50,"y":50,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":382,"y":50,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":382,"y":650,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false},{"objtype":"pathpoint","P":{"objtype":"coord","x":50,"y":650,"xlock":false,"ylock":false},"type":"corner","useh1":false,"useh2":false}],"winding":4,"maxes":{"xmax":382,"xmin":50,"ymax":650,"ymin":50}},"visible":true,"xlock":false,"ylock":false,"wlock":false,"hlock":false,"ratiolock":false}]',

		// page: font settings
		metadatahelp: {
			font_family: '',
			font_style: 'regular, italic, oblique',
			font_variant: 'normal, small-caps',
			font_weight: 'normal, bold, or a number 100-900',
			font_stretch: 'normal, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded',
			panose_1: 'Uses ten digits to describe the font\'s visual style.  A good overview can be found on Monotype\'s GitHub page: <a href="http://monotype.github.io/panose/pan2.htm" target="_blank">monotype.github.io/panose/pan2.htm</a>.',
			stemv: 'Average measurement of vertical stems.',
			stemh: 'Average measurement of horizontal stems.',
			slope: 'If italic, this is the slant angle, measured counterclockwise from vertical. Or zero for non-italic fonts.',
			underline_position: '',
			underline_thickness: '',
			strikethrough_position: '',
			strikethrough_thickness: '',
			overline_position: '',
			overline_thickness: '',
			designer: '',
			designerURL: '',
			manufacturer: '',
			manufacturerURL: '',
			license: '',
			licenseURL: '',
			version: 'Like: Version 0.1',
			description: '',
			copyright: '',
			trademark: ''
		}
	};

	_UI.colors.text_dark = _UI.colors.gray.l10;
	_UI.colors.text_light = _UI.colors.gray.l80;
	_UI.colors.button_disabled = _UI.colors.gray.l40;
	_UI.colors.button_resting = _UI.colors.gray.l80;
	_UI.colors.button_selected = _UI.colors.blue.l65;

//------------------------------
// GLOBAL PROJECT VARIABLES
//------------------------------
// These ARE saved with the project
// See obj_glyphrproject.js for reference

	var _GP = {};

// end of file// start of file
/**
	Functions
	This is an uber-bucket of high level and
	generic functions that don't fit well in other
	files.
**/

	window.onload = (_UI && _UI.coremode)? coreMode_OnLoad : glyphrStudio_OnLoad;

	function glyphrStudio_OnLoad() {
		//console.clear();
		console.log('%c\n	   GG			  GG\n	   G			   G\n GGGG  G GG   G  GGGG  GGGGG   GGGGG\nG	G G G	G G	G G	G G	 G\nG	G G G	G G	G G	G G\n GGGGG G  GGGGG GGGGG  GG   G GG\nGG   G   GG   G G			 STUDIO\n GGGG	 GGGG  GG\n\nv' + _UI.thisGlyphrStudioVersionNum + '\n\n', 'color:rgb(0,170,225)');
		//debug('\n MAIN SETUP - START');


		// Initialize Stuff
		insertGlobalDOMElements();
		setupGhostCanvas();
		document.title = 'Glyphr Studio';


		// Navigate
		if(_UI.devmode){
			//debug('\t >>> DEV NAV - to ' + _UI.dev_current_page);
			document.title = '░▒▓█ GSDEVMODE █▓▒░';

			if(_UI.dev_sample_project){
				//debug('\t >>> Using sample project');
				_UI.droppedFileContent = JSON.stringify(_UI.sampleproject[_UI.dev_sample_project]);
				importGlyphrProjectFromText();
				_UI.dev_sample_project = false;
			} else {
				newGlyphrProject();
			}

			if(_UI.dev_current_page === 'import svg'){
				_UI.importsvg.scale = false;
				_UI.importsvg.move = false;
			}

			navigate({page:(_UI.dev_current_page || 'openproject'), panel:_UI.dev_current_panel});
		}

		// Google Analytics
		function setupga(i,s,o,g,r,a,m){
			i.GoogleAnalyticsObject = r;
			i[r] = i[r] || function(){
				(i[r].q = i[r].q || []).push(arguments);
			};
			i[r].l = 1*new Date();
			a = s.createElement(o);
			m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a,m);
		}

		if (!_UI.devmode && _UI.telemetry) {
			try {
				setupga(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				ga('create', 'UA-71021902-1', 'auto');
				ga('send', 'pageview');
			} catch (err){
				console.warn('Google Analytics did not load.');
			}
		}

		navigate();

		if(_UI.devmode) _UI.testOnLoad();

		//debug(' MAIN SETUP - END\n');
	}

	function insertGlobalDOMElements(){

		var dialogbox = '<div id="dialog_box">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td id="dialogLeftBar"><button class="dialogCloseButton" onclick="closeDialog();">&times;</button></td>' +
		'<td id="dialogRightContent"></td>' +
		'</tr></table></div>';

		var bigdialogbox = '<table id="big_dialog_box" cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td id="dialogLeftBar"><button class="dialogCloseButton" onclick="closeDialog();">&times;</button></td>' +
		'<td id="bigDialogLeftContent"></td>'+
		'<td style="height:9999px;"><div id="bigDialogScrollContent"></div></td>'+
		'</tr></table>';

		var toast = '<span id="toast"></span>';

		var save = '<div id="npSave"></div>';
		save += '<div id="saveFormatFlyout" style="display:none;">';
		save += '<div class="closeFormatFlyout" onclick="closeDialog();">&times</div>';
		save += '<button onclick="closeDialog(); showToast(\'Saving Glyphr Studio Project file...\'); setTimeout(saveGlyphrProjectFile, 500);">' +
				makeIcon({'name':'button_npNav', 'width':32, 'height':32, 'size':50, 'color':_UI.colors.blue.l95, 'hovercolor':false}) +
				'<span>Glyphr Studio Project File</span>' +
			'</button>';

		save += '<button onclick="closeDialog(); showToast(\'Exporting OTF font file...\'); setTimeout(ioOTF_exportOTFfont, 500);">' +
				makeIcon({'name':'nav_exportotf', 'width':32, 'height':32, 'size':50, 'color':_UI.colors.blue.l95, 'hovercolor':false}) +
				'<span>OTF Font</span>' +
			'</button>';

		save += '<button onclick="closeDialog(); showToast(\'Exporting SVG font file...\'); setTimeout(ioSVG_exportSVGfont, 500);">' +
				makeIcon({'name':'nav_exportsvg', 'width':32, 'height':32, 'size':50, 'color':_UI.colors.blue.l95, 'hovercolor':false}) +
				'<span>SVG Font</span>' +
			'</button>';
		save += '</div>';

		document.body.innerHTML = '<div id="primaryScreenLayout"></div>';
		document.body.innerHTML += '<canvas id="ishereghostcanvas" height=10 width=10 ></canvas>';
		document.body.innerHTML += save;
		document.body.innerHTML += toast;
		document.body.innerHTML += '<div id="dialog_bg" onclick="closeDialog();"></div>';
		document.body.innerHTML += dialogbox;
		document.body.innerHTML += bigdialogbox;
		window.onbeforeunload = ohNoes;
	}

	function ohNoes() {
		popIn();
		if(_GP && _GP.projectsettings.stoppagenavigation && _UI.stoppagenavigation && !_UI.devmode){
			return '\n\nOh Noes!\nUnless you specifically saved your Glyphr Project, all your progress will be lost.\n\n';
		} else {
			return;
		}
	}


//-------------------
// Common Panel Title
//-------------------
	function makePanelSuperTitle() {
		// debug('\n makePanelSuperTitle - START');
		var content = '';
		if(!_UI.popout) {
			var selwi = getSelectedWorkItem();
			var name;
			// debug('\t selwi = ' + selwi.objtype);

			content += '<h1 class="panelsupertitle">'+_UI.current_page.toUpperCase();
			if (_UI.current_panel === 'npChooser' ||
				_UI.current_panel === 'npGuides' ||
				_UI.current_panel === 'npHistory') return content + '</h1>';

			if(selwi){
				name = (selwi.getName() || selwi.glyphhtml || selwi.shape.name || '[no shape outline yet]');
				// debug('\t selwi name is ' + name);

				if(selwi.name) name = name.replace(/latin /i, '');
				content += makeSuperTitleSeperator();
				content += escapeXMLValues(name);
			} else if (_UI.current_page === 'kerning'){
				// debug('\t selwi = false, on kerning');
				name = getSelectedKern();
				content += name? makeSuperTitleSeperator() + escapeXMLValues(name.getName()) : '';
			}
			content += '</h1>';
		}
		// debug(' makePanelSuperTitle - returning\n' + content + '\n');
		return content;
	}

	function makeSuperTitleSeperator() {
		var re = '<span class="supertitleseperator">';
		re += makeIcon({name:'button_more', color:_UI.colors.blue.l75, hovercolor:_UI.colors.blue.l75, size:10});
		re += makeIcon({name:'button_more', color:_UI.colors.blue.l75, hovercolor:_UI.colors.blue.l75, size:10});
		re += '</span>';
		return re;
	}


//-------------------
// Debug
//-------------------

	function debug(message, force){
		if(!_UI.devmode) return;

		if(_UI.debug || force){
			if(typeof message === 'string'){
				message = message.replace(/&lt;/gi, '<');
				message = message.replace(/&gt;/gi, '>');

				if(message === 'group') {
					console.group();
					return;
				} else if(message === 'groupCollapsed'){
					console.groupCollapsed();
					return;
				} else if(_UI.debugautogroup && message.indexOf('- START') > 0){
					console.group(message.substr(2).replace(' - START', ''));
					return;
				} else if(message === 'groupEnd'|| (_UI.debugautogroup && message.indexOf('- END') > 0)) {
					console.groupEnd(message);
					return;
				} else {
					console.log(message);
				}

			} else if (typeof message === 'object'){
				if(_UI.debugtableobjects) console.table(message);
				else console.log(message);
			}
		}
	}

	function json(obj, raw) {
		obj = clone(obj);
		if(raw) return JSON.stringify(obj);
		else {
			var j = JSON.stringify(obj, undefined, '\t');
			if(j) return j.replace(/\n/g, '\r\n');
			else return '';
		}
	}


//--------------------------------------
// Dialog Box, Error Box, Notation
//--------------------------------------
	function closeDialog(){
		if(!_UI.popout && document.getElementById('npSave')) document.getElementById('npSave').style.backgroundColor = 'transparent';
		document.getElementById('dialog_bg').style.display='none';
		document.getElementById('big_dialog_box').style.display='none';
		document.getElementById('dialog_box').style.display='none';
		document.getElementById('saveFormatFlyout').style.display='none';

		document.getElementById('dialogRightContent').innerHTML = "<b>Error: unspecified dialog box content.</b>";
		document.getElementById('bigDialogLeftContent').innerHTML = "<b>Error: unspecified dialog box content.</b>";

		// document.body.focus();
	}

	function openDialog(content){
		closeDialog();
		document.body.focus();
		var dc = document.getElementById('dialogRightContent');
		dc.innerHTML = content;

		if(dc.style.height > 800) dc.style.height = 800;
		else dc.style.width = 'auto';

		document.getElementById('dialog_box').style.display='block';
		document.getElementById('dialog_bg').style.display='block';
	}

	function openBigDialog(content, chooserContent){
		closeDialog();
		document.body.focus();
		
		document.getElementById('bigDialogLeftContent').innerHTML = content;
		chooserContent = chooserContent || make_GlyphChooser(_UI.glyphchooser.dialog);
		document.getElementById('bigDialogScrollContent').innerHTML = chooserContent;

		document.getElementById('big_dialog_box').style.display='block';
		document.getElementById('dialog_bg').style.display='block';
	}

	function isBigDialogOpen() {
		return document.getElementById('big_dialog_box').style.display === 'block';
	}

	function openNotation(content, x, y){
		getEditDocument().body.focus();
		var n = getEditDocument().getElementById('notation');
		n.innerHTML = content;
		n.style.top = (round(y)+'px');
		n.style.left = (round(x+50)+'px');
		n.style.display='block';
	}

	function closeNotation(){
		getEditDocument().getElementById('notation').style.display='none';
		getEditDocument().getElementById('notation').innerHTML = "&#x20E2;";
		getEditDocument().body.focus();
	}

	function toggleDialog_ExportOptions() {
		var sff = document.getElementById('saveFormatFlyout');
		var nps = document.getElementById('npSave');

		if(sff.style.display === 'block'){
			closeDialog();
		} else {
			nps.style.backgroundColor = _UI.colors.blue.l45;
			sff.style.display = 'block';
		}
	}

	function makeErrorMessageBox() {
		var con ='<div id="errormessagebox" style="display:none;">' +
		'<table cellpadding=0 cellspacing=0 border=0><tr>' +
		'<td class="errormessageleftbar">'+
		'<button class="errormessageclosebutton" onclick="closeErrorMessageBox();">&times;</button></td>' +
		'<td id="errormessagecontent"></td>' +
		'</tr></table></div>';

		return con;
	}

	function showErrorMessageBox(msg) {
		var msgcon = document.getElementById('errormessagecontent');
		var msgbox = document.getElementById('errormessagebox');
		msgcon.innerHTML = msg;
		msgbox.style.display = 'block';
		console.warn(msg);
	}

	function closeErrorMessageBox(){
		document.getElementById('errormessagecontent').innerHTML = "";
		document.getElementById('errormessagebox').style.display = 'none';
	}

	function showToast(msg, dur, fn) {
		// debug('\n showToast - START');
		var step = -1;
		var stepmax = 20;
		var timestep = 10;
		var divisor = 5;
		var msgdiv = getEditDocument().getElementById('toast');
		var durration = dur || 3000;
		msgdiv.innerHTML = msg || 'Howdy!';

		// debug('\t Typeof fn: ' + typeof fn);
		// console.log(fn);

		if(fn && typeof fn === 'function') {
			// debug('\t CALLING FUNCTION NOW');
			setTimeout(fn, 100);
		}

		if(_UI.toasttimeout){
			msgdiv.innerHTML = msg;
			appearFinish();
			return;
		}

		var currtop = -50;
		var finaltop = 15;
		var curropacity = 0;
		var finalopacity = 1;

		function appearFinish() {
			// debug('\t appearFinish');
			currtop = finaltop;
			curropacity = finalopacity;
			step = stepmax;

			msgdiv.style.marginTop = (finaltop + 'px');
			msgdiv.style.opacity = finalopacity;

			setToastTimeout(disappearStep, durration);

		}

		function appearStep() {
			// debug('\t appearStep ' + step);

			if(step < 0){
				msgdiv.style.display = 'block';
				msgdiv.style.marginTop = '-50px;';
				msgdiv.style.opacity = '0.0';
				msgdiv.style.borderBottomWidth = '0px';

				step++;

				setToastTimeout(appearStep, timestep);

			} else if (step < stepmax){
				step++;
				currtop = currtop + ((finaltop - currtop) / divisor);
				curropacity = curropacity + ((finalopacity - curropacity) / divisor);

				msgdiv.style.marginTop = (currtop + 'px');
				msgdiv.style.opacity = curropacity;

				setToastTimeout(appearStep, timestep);

			} else {
				appearFinish();
			}
		}

		function disappearStep() {
			// debug('\t appearStep ' + step);
			if(step < 0){
				msgdiv.style.display = 'none';
				msgdiv.style.marginTop = '-50px;';
				msgdiv.style.opacity = '0.0';
				msgdiv.innerHTML = '0_o';
				if(_UI.toasttimeout) {
					clearTimeout(_UI.toasttimeout);
					_UI.toasttimeout = false;
				}

			} else {
				step--;
				currtop = currtop - (currtop / divisor);
				curropacity = curropacity - (curropacity / divisor);

				msgdiv.style.marginTop = (currtop + 'px');
				msgdiv.style.opacity = curropacity;

				setToastTimeout(disappearStep, timestep);
			}
		}

		setToastTimeout(appearStep, 1);
		// debug(' showToast - END\n');
	}

	function setToastTimeout(fn, dur) {
		if(_UI.toasttimeout) clearTimeout(_UI.toasttimeout);
		_UI.toasttimeout = setTimeout(fn, dur);
	}


//-------------------
// Saved Sate
//-------------------
	function setProjectAsSaved(){
		_UI.projectsaved = true;

		if(_UI.devmode){
			document.title = '░▒▓█ GSDEVMODE █▓▒░';
		} else if(_UI.popout) {
			document.title = 'Glyphr Studio - Tools';
			_UI.popout.document.title = 'Glyphr Studio - Canvas';
		} else {
			document.title = 'Glyphr Studio';
		}

		updateSaveIcon();
	}

	function setProjectAsUnsaved(){
		_UI.projectsaved = false;

		if(_UI.devmode){
			document.title = '░▒▓█ GSDEVM❖DE █▓▒░';
		} else if(_UI.popout) {
			document.title = ' ❖ Glyphr Studio - Tools';
			_UI.popout.document.title = ' ❖ Glyphr Studio - Canvas';
		} else {
			document.title = ' ❖ Glyphr Studio';
		}

		updateSaveIcon();
	}

	function updateSaveIcon(){
		if(_UI.current_panel === 'npNav') return;

		var savecolor = _UI.colors.gray.l90;
		if(!_UI.projectsaved) savecolor = 'white';

		document.getElementById('npSave').innerHTML = '<table class="saveButtonTable">' +
		'<tr><td style="border-right:1px solid rgb(204, 209, 214);">' +
			'<button class="primarynavbutton" style="height:32px; width:38px; padding:4px 0px 0px 7px;" title="Save Glyphr Project File" onclick="showToast(\'Saving Glyphr Studio Project file...\'); setTimeout(saveGlyphrProjectFile, 500);">' +
				makeIcon({'name': 'button_npSave', 'size':24, 'color':savecolor, 'hovercolor':'white'}) +
			'</button></td><td>' +
			'<button class="primarynavbutton" style="height:36px; width:21px; text-align:left; padding:0px 0px 0px 4px;" title="Save File Format Options" onclick="toggleDialog_ExportOptions();">' +
				makeIcon({'name': 'button_more', 'height':10, 'width':10, 'size':10, 'color':savecolor, 'hovercolor':'white'}) +
			'</button></td></tr>'+
		'</table>';
	}


//-------------------
// File Savr
//-------------------

function saveFile(fname, buffer, ftype) {
	ftype = ftype || 'text/plain;charset=utf-8';
	var fblob = new Blob([buffer], {'type':ftype, 'endings':'native'});

	var link = document.createElement('a');
	window.URL = window.URL || window.webkitURL;
	link.href = window.URL.createObjectURL(fblob);
	link.download = fname;

	var event = document.createEvent('MouseEvents');
	event.initEvent('click', true, false);
	link.dispatchEvent(event);

	return;
}


//-------------------
// Common Functions
//-------------------
	// returns a full new copy of any object
	// 'parentpath' is a PathPoint property that is a pointer to it's parent Path
	// causes infinite loops when cloning objects.  Kind of a hack.
	function clone(cobj){
		var newObj = (cobj instanceof Array) ? [] : {};
		for (var i in cobj) {
			if (cobj[i] && typeof cobj[i] === 'object' && i !== 'parentpath' && i !== 'cache') {
				newObj[i] = clone(cobj[i]);
			} else newObj[i] = cobj[i];
		}
		return newObj;
	}

	// rounds a number to include a .5 so it draws nicely on canvas
	// true = +0.5, false = -0.5
	Number.prototype.makeCrisp = function(dir){
		var mul = dir? 1 : -1;
		return round(this) + (0.5 * mul);
	};

	// better rounding than Math.round
	function round(num, dec){
		if(!num) return 0;
		dec = dec || 0;
		return Number(Math.round(num+'e'+dec)+'e-'+dec) || 0;
	}

	// a function for flitering out duplicates in arrays
	function duplicates(v, i, a) { return a.indexOf(v) === i; }

	// floating point numbers make me mad
	function numSan(num) {
		num = parseFloat(num);
		var strnum = ''+num;

		if(strnum.indexOf('0000') > -1 || strnum.indexOf('9999') > -1){
			num = round(num, 6);
		}

		if(num < 0.0000 && num > 0) num = 0;

		return num;
	}

	// removes illegal file name chars
	function strSan(val){
		return val.replace(/[<>'"\\]/g,"");
	}

	// removes begining and trailing whitespace, and any breaking or tab chars
	function trim(text) {
		try {
			text = text.replace(/^\s+|\s+$/g, '');
			return text.replace(/(\r\n|\n|\r|\t)/gm, '');
		} catch(e) { return ''; }
	}

	// returns true for 0 and false
	function isval(val){
		if(val === 0) return true;
		else if (val === false) return true;
		else if(val === null || val === undefined) return false;
		else if ( typeof val === 'object' && Object.keys(val).length === 0 ) return false;
		else return !!val;
	}

	function getOverallMaxes(maxarr) {
		// debug('\n getOverallMaxes - START');
		// debug('\t start');
		// debug(maxarr);

		var re = clone(_UI.mins);
		var tm;

		for(var m=0; m<maxarr.length; m++){
			// debug('\t pass ' + m);
			tm = maxarr[m];
			// debug([tm]);

			// sanitize
			if(!isval(tm.xmax)) tm.xmax = clone(_UI.mins.xmax);
			if(!isval(tm.xmin)) tm.xmin = clone(_UI.mins.xmin);
			if(!isval(tm.ymax)) tm.ymax = clone(_UI.mins.ymax);
			if(!isval(tm.ymin)) tm.ymin = clone(_UI.mins.ymin);
			// debug([tm]);

			// find
			re.xmax = Math.max(re.xmax, tm.xmax);
			re.xmin = Math.min(re.xmin, tm.xmin);
			re.ymax = Math.max(re.ymax, tm.ymax);
			re.ymin = Math.min(re.ymin, tm.ymin);
			// debug([re]);
		}

		// debug(' getOverallMaxes - END\n');

		return re;
	}

	function reqAniFrame(fun) {
		if(_UI.popout){
			if(_UI.popout.requestAnimationFrame) _UI.popout.requestAnimationFrame(fun);
			else {
				console.warn('no requestAnimationFrame');
				fun();
			}
		} else {
			if(window.requestAnimationFrame) window.requestAnimationFrame(fun);
			else {
				console.warn('no requestAnimationFrame');
				fun();
			}
		}
	}

	function getShipDate(){
		var time = '' + (new Date().getTime());
		var prefix = parseInt(time.substr(0, 5)) * 100000000;
		var day = (parseInt(time.charAt(5)) + 1) * 10000000;
		return prefix + day;
	}


//--------------------------
// Angle and Rotation Stuff
//--------------------------

	/**
		Use JavaScript angle system by default:
		Radians, top is positive bottom is negative
		3 o'clock is zero, 9 o'clock is pi

		Glyphr Studio angle system:
		360 Degrees, 12 o'clock is zero, clockwise = positve
	**/

	function calculateAngleX(angle, y){
		x = Math.tan(angle*y);
		return x;
	}

	function calculateAngleY(angle, x){
		y = Math.tan(angle*x);
		return y;
	}

	function calculateAngle(h, p){
		p = p || {x:0, y:0};
		var result = Math.atan2(h.y - p.y, h.x - p.x);

		if(isNaN(result)){
			console.warn('calculateAngle returned NaN\n' + json(h) + '\n' + json(p));
			result = 0;
		}

		return result;
	}

	function calculateLength(h, p){
		var adj = p.x - h.x;
		var opp = p.y - h.y;
		var result = Math.sqrt( (adj*adj) + (opp*opp) );
		return result;
	}

	function rotate(coord, angle, about) {
		// debug('\n rotate - START');
		// debug('\t coord ' + json(coord, true));
		// debug('\t Math angle:\t' + angle);
		// debug('\t about ' + json(about, true));

		if(!angle || !coord) return;
		about = about || {x:0, y:0};

		coord.x -= about.x;
		coord.y -= about.y;

		var newx = (coord.x * Math.cos(angle)) - (coord.y * Math.sin(angle));
		var newy = (coord.x * Math.sin(angle)) + (coord.y * Math.cos(angle));

		coord.x = newx + about.x;
		coord.y = newy + about.y;

		// debug('\t new coord x/y: ' + coord.x + '/' + coord.y);
		// debug(' rotate - END\n');
	}

	//convert between degrees and radians
	function rad(deg) {	return (deg * Math.PI / 180) % Math.PI; }
	function deg(rad) {	return (rad * 180 / Math.PI) % 360; }

	// Shows the Glyphr Studio angle as opposed to the JavaScript angle
	function calculateNiceAngle(angle) {
		angle = deg(angle);
		angle = 360 - angle;
		angle -= 270;
		angle = angle % 360;
		if(angle < 0) angle += 360;

		return angle;
	}

	function niceAngleToAngle(angle) {
		angle += 90;
		angle = angle % 360;
		if(angle < 180) angle = 360 - angle;
		else angle *=-1;

		angle = rad(angle);

		return angle;
	}

	function async(fn, callback) {
		setTimeout(function() {
			fn();
			callback && callback(fn() || undefined);
		}, 0);
	}


//-------------------
// Object ID Stuff
//-------------------
	// Returns the first ID from an object
	function getFirstID(obj) {
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				return key;
			}
		}

		return false;
	}

	// Generate a new ID for an object
	function generateNewID(obj, base) {
		var number = 1;
		base = base || 'id';
		var id = ('' + base + number);
		while (obj.hasOwnProperty(id)) id = ('' + base + (++number));

		return id;
	}

	function getMyID(obj) {
		for(var g in _GP.glyphs){if(_GP.glyphs.hasOwnProperty(g)){
			if(obj === _GP.glyphs[g]) return g;
		}}

		for(var c in _GP.components){if(_GP.components.hasOwnProperty(c)){
			if(obj === _GP.components[c]) return c;
		}}

		for(var l in _GP.ligatures){if(_GP.ligatures.hasOwnProperty(l)){
			if(obj === _GP.ligatures[l]) return l;
		}}

		return false;
	}

	// returns the length of an associative array
	function getLength(obj){
		var len = 0;
		for(var key in obj){ if( obj.hasOwnProperty(key)) len++; }
		return len;
	}


//-------------------
// BUG EMAIL
//-------------------

	function genEmailContent(){
		var con = 'Have a feature idea or ran into an issue%3F We%27d be happy to help!';
		con += '%0A%0A%0A%0A___________________________________________%0A';
		con += 'version %09Glyphr Studio ' + _UI.thisGlyphrStudioVersionNum + '%0A';
		//con += 'appCodeName %09' + navigator.appCodeName + '%0A';
		con += 'app name %09' + navigator.appName + '%0A';
		//con += 'appVersion %09' + navigator.appVersion + '%0A';
		con += 'language %09' + navigator.language + '%0A';
		con += 'platform %09' + navigator.platform + '%0A';
		// con += 'systemLanguage %09' + navigator.systemLanguage + '%0A';
		// con += 'userLanguage %09' + navigator.userLanguage + '%0A';
		con += 'user agent %09' + encodeURIComponent(navigator.userAgent) + '%0A';

		//debug(con);

		return con;
	}


//-------------------
// COLORS
//-------------------

	function parseColorString(c) {
		var val = {r:0, g:0, b:0, a:1};

		if(typeof c !== 'string') return val;

		if(c.charAt(0)==="#"){
			c = c.substring(1,7);
			val.r = parseInt(c.substring(0,2),16);
			val.g = parseInt(c.substring(2,4),16);
			val.b = parseInt(c.substring(4,6),16);
		} else if (c.substring(0,4) === 'rgb('){
			c = c.split('(')[1].split(')')[0].split(',');
			val.r = parseInt(c[0], 10);
			val.g = parseInt(c[1], 10);
			val.b = parseInt(c[2], 10);
			val.a = parseInt(c[3], 10) || 1;
		}

		return val;
	}

	function shiftColor(c, percent, lighter){
		percent = Math.max(0,Math.min(percent,1));
		var val = parseColorString(c);

		val.r = Math.max(0,Math.min(val.r,255));
		val.g = Math.max(0,Math.min(val.g,255));
		val.b = Math.max(0,Math.min(val.b,255));

		if(lighter){
			val.r = round(((255-val.r)*percent)+val.r);
			val.g = round(((255-val.g)*percent)+val.g);
			val.b = round(((255-val.b)*percent)+val.b);
		} else {
			val.r = round(val.r-(val.r*percent));
			val.g = round(val.g-(val.g*percent));
			val.b = round(val.b-(val.b*percent));
		}

		return 'rgb('+val.r+','+val.g+','+val.b+')';
	}

	function RGBAtoRGB(rgb, alpha) {
		var val = parseColorString(rgb);

		var dr = round((255-val.r) * (1-alpha));
		var dg = round((255-val.g) * (1-alpha));
		var db = round((255-val.b) * (1-alpha));

		var r = val.r + dr;
		var g = val.g + dg;
		var b = val.b + db;

		return `rgb(${r},${g},${b})`;
	}

	function transparencyToAlpha(transparency) {
		var t = parseInt(transparency);
		if(!t || isNaN(t)) return 1;

		if(t > 100) return 0;
		if(t < 0) return 1;

		return ((100 - transparency) / 100);
	}


//-------------------
// COMBINATORICS
//-------------------

/**
 * K-combinations
 *
 * Get k-sized combinations of elements in a set.
 *
 * Usage:
 *   k_combinations(set, k)
 *
 * Parameters:
 *   set: Array of objects of any type. They are treated as unique.
 *   k: size of combinations to search for.
 *
 * Return:
 *   Array of found combinations, size of a combination is k.
 *
 * Examples:
 *
 *   k_combinations([1, 2, 3], 1)
 *   -> [[1], [2], [3]]
 *
 *   k_combinations([1, 2, 3], 2)
 *   -> [[1,2], [1,3], [2, 3]
 *
 *   k_combinations([1, 2, 3], 3)
 *   -> [[1, 2, 3]]
 *
 *   k_combinations([1, 2, 3], 4)
 *   -> []
 *
 *   k_combinations([1, 2, 3], 0)
 *   -> []
 *
 *   k_combinations([1, 2, 3], -1)
 *   -> []
 *
 *   k_combinations([], 0)
 *   -> []
 */
function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;

	if (k > set.length || k <= 0) {
		return [];
	}

	if (k == set.length) {
		return [set];
	}

	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}

	// Assert {1 < k < set.length}

	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i+1);
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

k_permutations = function(set, maxLen, excludeTwins) {
	// Copy initial values as arrays
	var perm = set.map(function(val) {
		return [val];
	});
	// Our permutation generator
	var generate = function(perm, maxLen, currLen) {
		// Reached desired length
		if (currLen === maxLen) {
			return perm;
		}
		// For each existing permutation
		for (var i = 0, len = perm.length; i < len; i++) {
			var currPerm = perm.shift();
			// Create new permutation
			for (var k = 0; k < set.length; k++) {
				if(!(excludeTwins && currPerm[0] === set[k])) perm.push(currPerm.concat(set[k]));
			}
		}
		// Recurse
		return generate(perm, maxLen, currLen + 1);
	};
	// Start with size 1 because of initial values
	return generate(perm, maxLen, 1);
};


// end of file
// start of file
/**
	Glyphr Studio Project
	A default project in Object form for easy new
	project creation.
**/


	function GlyphrProject(){

		// Default settings for new Glyphr Projects

		this.projectsettings = {
			// Internal Stuff
			version: _UI.thisGlyphrStudioVersion,				// project version
			versionnum: _UI.thisGlyphrStudioVersionNum,			// project number version
			initialversionnum: _UI.thisGlyphrStudioVersionNum,	// project number version that survives upgrades
			projectid: false,									// A unique ID for this project

			// Font Metrics
			name: 'My Font',		// project name (can be different than font names)
			upm: 1000,				// Units Per Em - (emsize) how tall normal cap letters are
			ascent: 700,			// ascender
			descent: -300,			// descender
			capheight: 675,			// capital letter height
			xheight: 400,			// lowercase letter height
			linegap: 250,			// distance between lines
			italicangle: 0,			// slant of glyphs, degrees from vertical counterclockwise, or negative for clockwise (ex: -15)
			griddivisions: 10,		// how many squares of grid per emsize
			overshoot: 10,			// overshoot for round glyphs
			defaultlsb: 20,			// default left side bearing
			defaultrsb: 20,			// default right side bearing
			glyphrange: {			// canned and custom Unicode ranges
				basiclatin: true,
				latinsupplement: false,
				latinextendeda: false,
				latinextendedb: false,
				custom: [],
				filternoncharpoints: true
			},

			// UI stuff
			pointsize: 7,						// path point square size
			spinnervaluechange: 1,				// how much spinner controls change a value
			renderpointssnappedtogrid: true, 	// OpenType.js requires all points be round numbers - project will still store decimals
			combineshapesonexport: false,		// combine overlapping shapes of the same winding into one shape
			maxcombineshapesonexport: 30,		// If a glyph has more than this number of shapes, combine will not be attempted
			svgprecision: 3,					// Decimal precision when creating SVG path data
			showkeyboardtipsicon: true,			// button for keyboard tips on edit canvas
			stoppagenavigation: true,			// asks to save on window close or refresh
			formatsavefile: true,				// makes the JSON save file readable
			showoutline: false,					// outline shapes when drawing
			showfill: true,						// fill shapes when drawing
			guides: {},							// user-defined guidelines
			snaptogrid: false,					// snap to grid lines
			snaptoguides: false,				// snap to guide lines
			snapdistance: 10,					// snap distance
			showcontextglyphguides: true,		// show horizontal guides & notations for context glyphs
			markglyphchooserglyphs: false,	  // mark specific glyphs in the glyph chooser
			colors: {
				glyphfill: 'rgb(0,0,0)',			// shape base color
				glyphoutline: 'rgb(0,0,0)',			// shape outline color
				gridtransparency: 85,				// transparency % for black grid lines
				systemguidetransparency: 75,		// transparency % for system guidelines
				customguidetransparency: 50,		// transparency % for custom guidelines
				contextglyphtransparency: 40,		// transparency % for context glyphs
				guide_dark: 'rgb(204,81,0)',		// Dark OS Guideline
				guide_med: 'rgb(255,132,51)',		// Medium OS Guideline
				guide_light: 'rgb(255,193,153)',	// Light OS Guideline
			}
		};

		this.metadata = {
			/* Shared Properties */
			shared: '{{sectionbreak}}',
			font_family: 'My Font',
			font_style: 'normal',
			panose_1: '2 0 0 0 0 0 0 0 0 0',
			designer: '',
			designerURL: '',
			manufacturer: '',
			manufacturerURL: '',
			license: '',
			licenseURL: '',
			version: '',
			description: '',
			copyright: '',
			trademark: '',

			// /* OTF Properties */
			// otf: '{{sectionbreak}}',

			/* SVG PROPERTIES */
			svg: '{{sectionbreak}}',
			// 'units_per_em': 0,
			// 'accent_height': 0,
			// 'ascent': 0,
			// 'cap_height': 0,
			// 'x_height': 0,
			// 'descent': 0,
			// 'bbox': 0,
			// 'unicode_range': 0,
			font_variant: 'normal',
			font_weight: 400,		// Default to 400
			font_stretch: 'normal',
			stemv: 0,
			stemh: 0,
			slope: 0,
			// 'font_size': 'all',
			// 'widths': 0,
			// 'ideographic': 0,
			// 'alphabetic': 0,
			// 'mathematical': 0,
			// 'hanging': 0,
			// 'v_ideographic': 0,
			// 'v_alphabetic': 0,
			// 'v_mathematical': 0,
			// 'v_hanging': 0,
			underline_position: -50,
			underline_thickness: 10,
			strikethrough_position: 300,
			strikethrough_thickness: 10,
			overline_position: 750,
			overline_thickness: 10
		};

		this.glyphs = {};

		this.ligatures = {};

		this.kerning = {};

		this.components = {};
	}

	function saveGlyphrProjectFile(overwrite){
		// debug('SAVEGLYPHRPROJECTVILE');
		// debug('\t ' + _GP.projectsettings.formatsavefile);

		// desktop overwrite / save as logic
		if (window && window.process && window.process.type) {
			if (overwrite) {
				window.saveFileOverwrite = true;
			}
			else {
				window.saveFileOverwrite = false;
			}
		}

		var savedata = cloneForSaveData(_GP);

		if(_GP.projectsettings.formatsavefile) savedata = json(savedata);
		else savedata = JSON.stringify(savedata);

		//debug('saveGlyphrProjectFile - \n'+savedata);
		var fname =  _GP.projectsettings.name + ' - Glyphr Project - ' + genDateStampSuffix() + '.txt';

		saveFile(fname, savedata);

		closeDialog();
		setProjectAsSaved();
	}

	function cloneForSaveData(cobj){
		var newObj = (cobj instanceof Array) ? [] : {};
		for (var i in cobj) {
			if(i !== 'parentpath' && i !== 'cache'){
				if (cobj[i] && typeof cobj[i] === 'object') {
					newObj[i] = cloneForSaveData(cobj[i]);
				} else newObj[i] = cobj[i];
			}
		}
		return newObj;
	}

	function genProjectID() {
		var j = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		var re = 'g_';

		for(var i=0; i<10; i++){
			re += j.charAt(Math.floor(Math.round(Math.random()*j.length)));
		}

		return re;
	}

	function genDateStampSuffix(){
		var d = new Date();
		var yr = d.getFullYear();
		var mo = d.getMonth()+1;
		var day = d.getDate();
		var hr = d.getHours();
		var min = (d.getMinutes()<10? '0' : '') + d.getMinutes();
		var sec = (d.getSeconds()<10? '0' : '') + d.getSeconds();

		return (''+yr+'.'+mo+'.'+day+'-'+hr+'.'+min+'.'+sec);
	}

	function glyphRangeIterator(fname) {
		var cr = _GP.projectsettings.glyphrange;
		var ccon = '';
		//var count = 0;

		if(cr.basiclatin){
			for(var i=0; i<_UI.basiclatinorder.length; i++){
				ccon += fname(_UI.basiclatinorder[i]);
				//count++;
			}
		}

		if(cr.latinsupplement){
			for(var s=_UI.glyphrange.latinsupplement.begin; s<=_UI.glyphrange.latinsupplement.end; s++){
				ccon += fname(decToHex(s));
				//count++;
			}
		}

		if(cr.latinextendeda){
			for(var a=_UI.glyphrange.latinextendeda.begin; a<=_UI.glyphrange.latinextendeda.end; a++){
				ccon += fname(decToHex(a));
				//count++;
			}
		}

		if(cr.latinextendedb){
			for(var b=_UI.glyphrange.latinextendedb.begin; b<=_UI.glyphrange.latinextendedb.end; b++){
				ccon += fname(decToHex(b));
				//count++;
			}
		}

		if(cr.custom.length){
			for(var c=0; c<cr.custom.length; c++){
				for(var range=cr.custom[c].begin; range<cr.custom[c].end; range++){
					ccon += fname(decToHex(range));
					//count++;
				}
			}
		}

		//debug('GLYPHRangeITERATOR - count returned ' + count);

		return ccon;
	}

	function calcFontMaxes(){
		var fm = _UI.fontmetrics;
		fm.numglyphs = 0;
		fm.maxglyph = 0x20;

		glyphRangeIterator(function(hex){
			fm.numglyphs++;
			fm.maxglyph = Math.max(fm.maxglyph, hex);
			var cm = _GP.glyphs[hex];
			if(cm){
				cm = cm.maxes;
				fm.maxes.xmax = Math.max(cm.xmax, fm.maxes.xmax);
				fm.maxes.xmin = Math.min(cm.xmin, fm.maxes.xmin);
				fm.maxes.ymax = Math.max(cm.ymax, fm.maxes.ymax);
				fm.maxes.ymin = Math.min(cm.ymin, fm.maxes.ymin);
			}
		});

		// var proportion = (fm.ymax / (fm.ymax-fm.ymin));
		// var total = fm.ymax + Math.abs(fm.ymin) + _GP.projectsettings.linegap;
		// fm.hhea_ascent = round(total*proportion);
		// fm.hhea_descent = (fm.hhea_ascent - total);

		// debug('CALCFONTMAXES - numglyphs ' + _UI.fontmetrics.numglyphs);
	}

// end of file
// start of file
/**
	Guide
	An object used by the UI for drawing guide 
	lines on the edit canvas, and for saving 
	custom guides to a Glyphr Studio Project.
**/


	function Guide(oa){
		this.objtype = 'guide';

		this.type = oa.type || 'vertical';
		this.name = oa.name || (this.type + ' guide');
		this.location = isval(oa.location)? oa.location : 200;
		this.angle = oa.angle || false;
		this.color = oa.color || makeRandomSaturatedColor();
		this.visible = isval(oa.visible)? oa.visible : true;
		this.showname = isval(oa.showname)? oa.showname : true;
		this.editable = isval(oa.editable)? oa.editable : true;
	}

	Guide.prototype.draw = function(delta) {
		// debug('\nGuide.draw \t START');
		// debug('\t name: ' + this.name);
		// debug('\t delta: ' + delta);
		if(!this.visible) return;

		delta = delta*1;
		var ctx = _UI.glypheditctx;
		var cansize = _UI.glypheditcanvassize;
		var psc = _GP.projectsettings.colors;
		var v = getView('guide');
		var start = {x:0, y:0};
		var end = {x:0, y:0};
		var label = {x:0, y:0};
		var pad = 5;
		var pos;

		// debug('\t view: ' + JSON.stringify(v));
		// debug('\t location: ' + this.location);

		if(this.type === 'horizontal'){
			pos = (v.dy - (this.location*v.dz)).makeCrisp();
			if(delta) pos += (delta*v.dz);
			start.x = 0;
			start.y = pos;
			end.x = cansize;
			end.y = pos;
			label.x = 25;
			label.y = pos - pad;
		} else if (this.type === 'vertical'){
			pos = (v.dx - (this.location*v.dz*-1)).makeCrisp();
			if(delta) pos += (delta*v.dz);
			start.x = pos;
			start.y = 0;
			end.x = pos;
			end.y = cansize;
			label.x = pos + pad;
			label.y = 11;
		}

		var alpha = transparencyToAlpha(this.editable? psc.customguidetransparency : psc.systemguidetransparency);
		var color = RGBAtoRGB(this.color, alpha);
	
		if(color !== 'rgb(255,255,255)'){
			// Draw Line
			// debug('\t start: ' + JSON.stringify(start) + ' / end: ' + JSON.stringify(end));
			ctx.strokeStyle = color;
			ctx.globalAlpha = 1;
			ctx.lineWidth = 1;
			if(isval(delta)) ctx.strokeStyle = shiftColor(color, 0.6, true);
			ctx.beginPath();
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();
			ctx.closePath();
	
			// Draw Label
			if(this.showname && _UI.showguidelabels && !delta){
				_UI.glypheditctx.fillStyle = color;
				_UI.glypheditctx.font = '10px tahoma, verdana, sans-serif';
				_UI.glypheditctx.fillText(this.name, label.x, label.y);
			}
		}

		// debug('Guide.draw \t END\n');
	};

	function makeRandomSaturatedColor(){
		var sat = Math.floor(Math.random()*5)*51;
		var arr = [];
		var satloc = Math.floor(Math.random()*3);
		arr[satloc] = sat;
		switch(satloc){
			case 0:
				arr[1] = 0;
				arr[2] = 255;
				break;
			case 1:
				arr[0] = 0;
				arr[2] = 255;
				break;
			case 2:
				arr[0] = 255;
				arr[1] = 0;
				break;
		}
		return 'rgb('+arr[0]+','+arr[1]+','+arr[2]+')';
	}
// end of file// start of file
/**
	Object > Glyph
	A single collection of outlines that could
	either represent a character, or be used as
	part of another character through components.
	The following objects are stored as Glyph
	Objects:
		Glyphs (Characters)
		Ligatures
		Components
**/


//-------------------------------------------------------
// GLYPH OBJECT
//-------------------------------------------------------
	function Glyph(oa){
		// debug('\n Glyph - START');
		oa = oa || {};
		this.objtype = 'glyph';

		this.hex = oa.glyphhex || false;
		this.name = oa.name || getGlyphName(oa.glyphhex) || false;
		this.glyphhtml = oa.glyphhtml || hexToHTML(oa.glyphhex) || false;
		this.isautowide = isval(oa.isautowide)? oa.isautowide : true;
		this.glyphwidth = isval(oa.glyphwidth)? oa.glyphwidth : 0;
		this.leftsidebearing = isval(oa.leftsidebearing)? oa.leftsidebearing : false;
		this.rightsidebearing = isval(oa.rightsidebearing)? oa.rightsidebearing : false;
		this.ratiolock = isval(oa.ratiolock)? oa.ratiolock : false;
		this.maxes = oa.maxes || clone(_UI.mins);
		this.shapes = oa.shapes || [];
		this.usedin = oa.usedin || [];
		this.contextglyphs = '';

		// debug('\t name: ' + this.name);

		var lc = 0;
		var cs = 0;
		if(oa.shapes && oa.shapes.length){
			for(var i=0; i<oa.shapes.length; i++) {
				if(oa.shapes[i].objtype === 'componentinstance'){
					// debug('\t hydrating ci ' + oa.shapes[i].name);
					this.shapes[i] = new ComponentInstance(oa.shapes[i]);
					lc++;
				} else {
					// debug('\t hydrating sh ' + oa.shapes[i].name);
					this.shapes[i] = new Shape(oa.shapes[i]);
					cs++;
				}
			}
		}

		if(this.getGlyphMaxes) this.getGlyphMaxes();

		// cache
		oa.cache = oa.cache || {};
		this.cache = {};
		this.cache.svg = oa.cache.svg || false;

		// debug(' Glyph - END\n');
	}



//-------------------------------------------------------
// TRANSFORM & MOVE
//-------------------------------------------------------
	Glyph.prototype.setGlyphPosition = function(nx, ny, force){
		// debug('Glyph.setGlyphPosition - START');
		// debug('\t nx/ny/force: ' + nx + ' ' + ny + ' ' + force);
		var m = this.getMaxes();
		if(nx !== false) nx = parseFloat(nx);
		if(ny !== false) ny = parseFloat(ny);
		var dx = (nx !== false)? (nx - m.xmin) : 0;
		var dy = (ny !== false)? (ny - m.ymax) : 0;
		this.updateGlyphPosition(dx, dy, force);
		// debug(' Glyph.setGlyphPosition - END\n');
	};

	Glyph.prototype.updateGlyphPosition = function(dx, dy, force){
		// debug('\n Glyph.updateGlyphPosition - START ' + this.name);
		// debug('\t dx/dy/force: ' + dx + ' ' + dy + ' ' + force);
		// debug('\t number of shapes: ' + this.shapes.length);

		dx = parseFloat(dx) || 0;
		dy = parseFloat(dy) || 0;
		var cs = this.shapes;
		for(var i=0; i<cs.length; i++){
			cs[i].updateShapePosition(dx, dy, force);
		}

		this.changed();

		// debug(' Glyph.updateGlyphPosition - END ' + this.name + '\n\n');
	};

	Glyph.prototype.setGlyphSize = function(nw, nh, ratiolock){
		// debug('SET GLYPHSIZE ---- nw/nh/ra:\t' + nw + '\t ' + nh + '\t ' + ratiolock);
		// debug('\t maxes: ' + json(this.maxes));
		var m = this.getMaxes();
		if(nw !== false) nw = parseFloat(nw);
		if(nh !== false) nh = parseFloat(nh);
		var ch = (m.ymax - m.ymin);
		var cw = (m.xmax - m.xmin);
		var dw = (nw !== false)? (nw - cw) : 0;
		var dh = (nh !== false)? (nh - ch) : 0;

		if(ratiolock){
			if(Math.abs(nh) > Math.abs(nw)) dw = (cw*(nh/ch)) - cw;
			else dh = (ch*(nw/cw)) - ch;
		}
		this.updateGlyphSize(dw, dh, false);
	};

	Glyph.prototype.updateGlyphSize = function(dw, dh, ratiolock, dontscalecomponentinstances){
		// debug('\n Glyph.updateGlyphSize - START ' + this.name);
		// debug('\t number of shapes: ' + this.shapes.length);
		// debug('\t dw dh rl:\t' + dw + '/' + dh + '/' + ratiolock);

		var m = this.getMaxes();
		if(dw !== false) dw = parseFloat(dw) || 0;
		if(dh !== false) dh = parseFloat(dh) || 0;
		// debug('\t adjust dw/dh:\t' + dw + '/' + dh);

		var oldw = m.xmax - m.xmin;
		var oldh = m.ymax - m.ymin;

		var neww = (oldw + dw);
		var newh = (oldh + dh);
		if(Math.abs(neww) < 1) neww = 1;
		if(Math.abs(newh) < 1) newh = 1;
		// debug('\t new w/h:\t' + neww + '/' + newh);

		var ratiodh = (newh/oldh);
		var ratiodw = (neww/oldw);
		// debug('\t ratio dw/dh:\t' + ratiodw + '/' + ratiodh);
		if(ratiolock){
			// Assuming only one will be nonzero
			// if(Math.abs(ratiodh) > Math.abs(ratiodw)) ratiodw = ratiodh;
			// else ratiodh = ratiodw;
			if(dw !== 0 && dh === 0) ratiodh = ratiodw;
			else ratiodw = ratiodh;
		}
		// debug('\t ratio dw/dh:\t' + ratiodw + '/' + ratiodh);

		var cs = this.shapes;
		var s, smaxes,
			oldsw, oldsh, oldsx, oldsy,
			newsw, newsh, newsx, newsy,
			sdw, sdh, sdx, sdy;

		// debug('\t Before Maxes ' + json(m, true));
		for(var i=0; i<cs.length; i++){
			s = cs[i];
			// debug('\t >>> Updating ' + s.objtype + ' ' + i + '/' + cs.length + ' : ' + s.name);
			smaxes = s.getMaxes();

			// scale
			oldsw = smaxes.xmax - smaxes.xmin;
			newsw = oldsw * ratiodw;
			if(ratiodw === 0) sdw = false;
			else sdw = newsw - oldsw;

			oldsh = smaxes.ymax - smaxes.ymin;
			newsh = oldsh * ratiodh;
			if(ratiodh === 0) sdh = false;
			else sdh = newsh - oldsh;

			// debug('\t Shape ' + i + ' dw dh ' + sdw + ' ' + sdh);
			if(s.objtype === 'componentinstance' && dontscalecomponentinstances) {
				// Special case skipping scaling of CIs for Global Actions
				// debug(`\t Skipped this shape because it's a component instance`);
			} else {
				// It's a regular shape, or we're scaling everything
				s.updateShapeSize(sdw, sdh, false);				
			}

			// move
			oldsx = smaxes.xmin - m.xmin;
			newsx = oldsx * ratiodw;
			if(ratiodw === 0) sdx = false;
			else sdx = newsx - oldsx;

			oldsy = smaxes.ymin - m.ymin;
			newsy = oldsy * ratiodh;
			if(ratiodh === 0) sdy = false;
			else sdy = newsy - oldsy;

			// debug('\t Shape Pos ' + i + ' dx dy ' + sdx + ' ' + sdy);
			s.updateShapePosition(sdx, sdy, true);

		}

		this.changed();
		// debug('\t Afters Maxes ' + json(this.maxes, true));
		// debug(' Glyph.updateGlyphSize - END ' + this.name + '\n');
	};

	Glyph.prototype.flipEW = function(mid){
		// debug('\n Glyph.flipEW - START');
		// debug('\t ' + this.name);
		// debug('\t passed mid = ' + mid);
		var m = this.getMaxes();
		mid = isval(mid)? mid : ((m.xmax - m.xmin) / 2) + m.xmin;
		// debug('\t mid = ' + mid);
		// debug('\t maxes = ' + json(m, true));
		for(var s=0; s < this.shapes.length; s++){
			this.shapes[s].flipEW(mid);
		}

		this.changed();
		// debug('\t maxes = ' + json(this.maxes, true));
	};

	Glyph.prototype.flipNS = function(mid){
		var m = this.getMaxes();
		mid = isval(mid)? mid : ((m.ymax - m.ymin) / 2) + m.ymin;
		for(var s=0; s < this.shapes.length; s++){
			this.shapes[s].flipNS(mid);
		}

		this.changed();
	};

	Glyph.prototype.rotate = function(angle, about) {
		about = about || this.getCenter();

		for(var s=0; s < this.shapes.length; s++){
			this.shapes[s].rotate(angle, about);
		}

		this.changed();
	};

	Glyph.prototype.reverseWinding = function() {
		for(var s=0; s<this.shapes.length; s++){
			this.shapes[s].reverseWinding();
		}

		this.changed();
	};

	Glyph.prototype.alignShapes = function(edge, target) {
		// debug('\n Glyph.alignShapes - START');
		// debug('\t edge: ' + edge);
		var target, offset;

		if(edge === 'top'){
			target = -999999;

			this.shapes.forEach(function(v) {
				target = Math.max(target, v.getMaxes().ymax);
			});

			// debug('\t found TOP: ' + target);
			
			this.shapes.forEach(function(v) {
				v.setShapePosition(false, target);
			});


		} else if (edge === 'middle'){
			target = this.getCenter().y;

			// debug('\t found MIDDLE: ' + target);

			this.shapes.forEach(function(v) {
				offset = v.getCenter().y;
				v.updateShapePosition(false, (target - offset));
			});


		} else if (edge === 'bottom'){
			target = 999999;

			this.shapes.forEach(function(v) {
				target = Math.min(target, v.getMaxes().ymin);
			});

			// debug('\t found BOTTOM: ' + target);

			this.shapes.forEach(function(v) {
				offset = v.getMaxes().ymin;
				v.updateShapePosition(false, (target - offset));
			});


		} else if (edge === 'left'){
			target = 999999;
			
			this.shapes.forEach(function(v) {
				target = Math.min(target, v.getMaxes().xmin);
			});

			// debug('\t found LEFT: ' + target);

			this.shapes.forEach(function(v) {
				v.setShapePosition(target, false);
			});


		} else if (edge === 'center'){
			target = this.getCenter().x;

			// debug('\t found CENTER: ' + target);

			this.shapes.forEach(function(v) {
				offset = v.getCenter().x;
				v.updateShapePosition((target - offset), false);
			});


		} else if (edge === 'right'){
			target = -999999;

			this.shapes.forEach(function(v) {
				target = Math.max(target, v.getMaxes().xmax);
			});

			// debug('\t found RIGHT: ' + target);

			this.shapes.forEach(function(v) {
				offset = v.getMaxes().xmax;
				v.updateShapePosition((target - offset), false);
			});
		}

		this.changed();
		// debug(' Glyph.alignShapes - END\n');
	};


//-------------------------------------------------------
// GETTERS
//-------------------------------------------------------
	Glyph.prototype.getName = function() { return this.name; };
	
	Glyph.prototype.getChar = function() { return getGlyphName(this.hex); };

	Glyph.prototype.getHTML = function() { return this.glyphhtml || ''; };

	Glyph.prototype.getLSB = function() {
		if(this.leftsidebearing === false) return _GP.projectsettings.defaultlsb;
		else return this.leftsidebearing;
	};

	Glyph.prototype.getRSB = function() {
		if(this.rightsidebearing === false) return _GP.projectsettings.defaultrsb;
		else return this.rightsidebearing;
	};

	Glyph.prototype.getCenter = function() {
		var m = this.getMaxes();
		var re = {};
		re.x = ((m.xmax - m.xmin) / 2) + m.xmin;
		re.y = ((m.ymax - m.ymin) / 2) + m.ymin;

		return re;
	};



//-------------------------------------------------------
// CALCULATING SIZE
//-------------------------------------------------------
	Glyph.prototype.calcGlyphMaxes = function(){
		// debug('\n Glyph.calcGlyphMaxes - START ' + this.name);

		this.maxes = clone(_UI.mins);
		var tm;

		if(this.shapes.length > 0){
			for(var jj=0; jj<this.shapes.length; jj++) {
				// debug('\t ++++++ START shape ' + jj);
				// debug(this.shapes[jj]);

				if(this.shapes[jj].getMaxes){
					tm = this.shapes[jj].getMaxes();
					// debug('\t before ' + json(tm, true));
					this.maxes = getOverallMaxes([tm, this.maxes]);
					// debug('\t afters ' + json(tm, true));
					// debug('\t ++++++ END shape ' + jj + ' - ' + this.shapes[jj].name);
				}
			}
		} else {
			this.maxes = { 'xmax': 0, 'xmin': 0, 'ymax': 0, 'ymin': 0 };
		}

		this.calcGlyphWidth();

		// debug(' Glyph.calcGlyphMaxes - END ' + this.name + '\n');
		return clone(this.maxes);
	};

	Glyph.prototype.calcGlyphWidth = function(){
		if(!this.isautowide) return;
		this.glyphwidth = Math.max(this.maxes.xmax, 0);
	};

	Glyph.prototype.getAdvanceWidth = function() {
		this.calcGlyphWidth();
		if(!this.isautowide) return this.glyphwidth;
		else return this.glyphwidth + this.getLSB() + this.getRSB();
	};

	Glyph.prototype.getMaxes = function() {
		// debug('\n Glyph.getMaxes - START ' + this.name);
		if(hasNonValues(this.maxes)){
			// debug('\t ^^^^^^ maxes found NaN, calculating...');
			this.calcGlyphMaxes();
			// debug('\t ^^^^^^ maxes found NaN, DONE calculating...');
		}

		if(this.shapes.length){
			if( this.maxes.xmin === _UI.maxes.xmin ||
				this.maxes.xmin === _UI.mins.xmin ||
				this.maxes.xmax === _UI.maxes.xmax ||
				this.maxes.xmax === _UI.mins.xmax ||
				this.maxes.ymin === _UI.maxes.ymin ||
				this.maxes.ymin === _UI.mins.ymin ||
				this.maxes.ymax === _UI.maxes.ymax ||
				this.maxes.ymax === _UI.mins.ymax
				){
				this.calcGlyphMaxes();
			}
		}
		
		// debug('\t returning ' + json(this.maxes));
		// debug(' Glyph.getMaxes - END ' + this.name + '\n');
		return clone(this.maxes);
	};

	function hasNonValues(obj) {
		if(!obj) return true;

		for(var v in obj){ if(obj.hasOwnProperty(v)){
			if(!isval(obj[v])) return true;
		}}

		return false;
	}


//-------------------------------------------------------
// COMPONENT STUFF
//-------------------------------------------------------
	Glyph.prototype.containsComponents = function(){
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype === 'componentinstance'){
				return true;
			}
		}
		return false;	
	}
	
	Glyph.prototype.canAddComponent = function(cid) {
		// debug('\n Glyph.canAddComponent - START');
		var myid = ''+getMyID(this);
		// debug('\t adding ' + cid + ' to (me) ' + myid);

		if(myid === cid) return false;
		if(this.usedin.length === 0) return true;

		var downlinks = this.collectAllDownstreamLinks([], true);
		downlinks = downlinks.filter(function(elem, pos) { return downlinks.indexOf(elem) === pos;});

		var uplinks = this.collectAllUpstreamLinks([]);
		uplinks = uplinks.filter(function(elem, pos) { return uplinks.indexOf(elem) === pos;});

		// debug('\t downlinks: ' + downlinks);
		// debug('\t uplinks: ' + uplinks);

		if(downlinks.indexOf(cid) > -1) return false;
		if(uplinks.indexOf(cid) > -1) return false;

		return true;
	};

	Glyph.prototype.collectAllDownstreamLinks = function(re, excludepeers) {
		re = re || [];
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype === 'componentinstance'){
				re = re.concat(getGlyph(this.shapes[s].link).collectAllDownstreamLinks(re));
				if(!excludepeers) re.push(this.shapes[s].link);
			}
		}
		return re;
	};

	Glyph.prototype.collectAllUpstreamLinks = function(re) {
		re = re || [];
		for(var g=0; g<this.usedin.length; g++){
			re = re.concat(getGlyph(this.usedin[g]).collectAllUpstreamLinks(re));
			re.push(this.usedin[g]);
		}
		return re;
	};

	// This method is called on Glyphs just before they are deleted
	// to clean up all the component instance linking
	Glyph.prototype.deleteLinks = function(thisid) {
		// debug('\n Glyph.deleteLinks - START');
		// debug('\t passed this as id: ' + thisid);

		// Delete upstream Component Instances
		var upstreamglyph;
		for(var c=0; c<this.usedin.length; c++){
			upstreamglyph = getGlyph(this.usedin[c]);
			// debug('\t removing from ' + upstreamglyph.name);
			// debug(upstreamglyph.shapes);
			for(var u=0; u<upstreamglyph.shapes.length; u++){
				if(upstreamglyph.shapes[u].objtype === 'componentinstance' && upstreamglyph.shapes[u].link === thisid){
					upstreamglyph.shapes.splice(u, 1);
					u--;
				}
			}
			// debug(upstreamglyph.shapes);
		}

		// Delete downstream usedin array values
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype === 'componentinstance'){
				removeFromUsedIn(this.shapes[s].link, thisid);
			}
		}
	};


//-------------------------------------------------------
// DRAWING AND EXPORTING
//-------------------------------------------------------
	Glyph.prototype.drawGlyph = function(lctx, view, alpha, addLSB){
		// debug('\n Glyph.drawGlyph - START ' + this.name);
		// debug('\t view ' + json(view, true));

		var sl = this.shapes;
		var shape, drewshape;
		if(isNaN(alpha) || alpha > 1 || alpha < 0) alpha = 1;

		if(addLSB && this.isautowide) view.dx += (this.getLSB() * view.dz);

		lctx.beginPath();
		for(var j=0; j<sl.length; j++) {
			shape = sl[j];
			if(shape.visible) {
				// debug('\t ' + this.name + ' drawing ' + shape.objtype + ' ' + j + ' ' + shape.name);
				drewshape = shape.drawShape(lctx, view);

				if(!drewshape){
					console.warn('Could not draw shape ' + shape.name + ' in Glyph ' + this.name);
					if(shape.objtype === 'componentinstance' && !getGlyph(shape.link)){
						console.warn('>>> Component Instance has bad link: ' + shape.link);

						var i = this.shapes.indexOf(shape);
						if(i > -1){
							this.shapes.splice(i, 1);
							console.warn('>>> Deleted the Instance');
						}
					}
				}
			}
		}

		lctx.closePath();
		// lctx.fillStyle = RGBAtoRGB(_GP.projectsettings.colors.glyphfill, alpha);
		lctx.fillStyle = _GP.projectsettings.colors.glyphfill;
		lctx.globalAlpha = alpha;
		lctx.fill('nonzero');
		lctx.globalAlpha = 1;

		// debug(' Glyph.drawGlyph - END ' + this.name + '\n');
		return (this.getAdvanceWidth()*view.dz);
	};

	Glyph.prototype.makeSVG = function(size, gutter) {
		// debug('\n Glyph.makeSVG - START');
		var ps = _GP.projectsettings;
		size = size || _UI.thumbsize;
		gutter = gutter || _UI.thumbgutter;
		var emsquare = Math.max(ps.upm, (ps.ascent - ps.descent));
		var desc = Math.abs(ps.descent);
		var charscale = (size-(gutter*2)) / size;
		var gutterscale = (gutter / size) * emsquare;
		var vbsize = emsquare - (gutter*2);
		var pathdata = this.getSVGpathData();

		// Assemble SVG
		var re = '<svg version="1.1" ';
		re += 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ';
		re += 'width="'+size+'" height="'+size+'" viewBox="0,0,'+vbsize+','+vbsize+'">';
		re += '<g transform="translate('+(gutterscale)+','+(emsquare-desc-(gutterscale/2))+') scale('+charscale+',-'+charscale+')">';
		// re += '<rect x="0" y="-'+desc+'" height="'+desc+'" width="1000" fill="lime"/>';
		// re += '<rect x="0" y="0" height="'+(emsquare-desc)+'" width="1000" fill="cyan"/>';
		re += '<path d="' + pathdata + '"/>';
		re += '</g>';
		re += '</svg>';

		// debug(' Glyph.makeSVG - END\n');

		return re;
	};

	Glyph.prototype.getSVGpathData = function() {
		if(this.cache.svgpathdata) return this.cache.svgpathdata;

		this.cache.svgpathdata = this.makeSVGpathData();

		return this.cache.svgpathdata;
	};

	Glyph.prototype.makeSVGpathData = function() {
		if(this.cache.svg) return this.cache.svg;

		var sl = this.shapes;
		var pathdata = '';
		var lsb = this.getLSB();
		var shape, path, tg;

		// Make Pathdata
		for(var j=0; j<sl.length; j++) {
			shape = sl[j];
			if(shape.visible) {
				if(shape.objtype === 'componentinstance'){
					tg = shape.getTransformedGlyph();
					if(tg) pathdata += tg.getSVGpathData();
				} else {
					path = shape.getPath();
					path.updatePathPosition(lsb, 0, true);
					pathdata += path.getSVGpathData('Glyph ' + this.name + ' Shape ' + shape.name);
					if(j < sl.length-1) pathdata += ' ';
				}
			}
		}
		if(trim(pathdata) === '') pathdata = 'M0,0Z';

		this.cache.svg = pathdata;
		return pathdata;
	};

	Glyph.prototype.makeOpenTypeJSpath = function(otpath) {
		otpath = otpath || new opentype.Path();
		for(var s=0; s < this.shapes.length; s++){
			otpath = this.shapes[s].makeOpenTypeJSpath(otpath);
		}
		return otpath;
	};

	Glyph.prototype.draw_MultiSelectAffordances = function() {
		var allpoints = [];

		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype !== 'componentinstance'){
				allpoints = allpoints.concat(this.shapes[s].path.pathpoints);
				this.shapes[s].draw_PathOutline(_UI.colors.blue, 1);
			}
		}

		draw_PathPoints(allpoints, _UI.colors.blue);
	};

	Glyph.prototype.isOverControlPoint = function(x, y, nohandles) {
		var re = false;
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype !== 'componentinstance'){
				re = this.shapes[s].path.isOverControlPoint(x, y, nohandles);
				if(re) return re;
			}
		}

		return false;
	};

	Glyph.prototype.flattenGlyph = function() {
		var reshapes = [];
		var ts, tg;

		for(var s=0; s<this.shapes.length; s++){
			ts = this.shapes[s];

			if(ts.objtype === 'shape'){
				reshapes.push(new Shape(clone(ts)));

			} else if (ts.objtype === 'componentinstance'){
				tg = ts.getTransformedGlyph();
				tg = tg.flattenGlyph();
				reshapes = reshapes.concat(tg.shapes);
			} else {
				// debug('\n Glyph.flattenGlyph - ERROR - none shape or ci in shapes array');
			}
		}

		this.shapes = reshapes;
		// this.calcGlyphMaxes();

		return this;
	};

	Glyph.prototype.combineAllShapes = function(donttoast, dontresolveoverlaps) {
		// debug('\n Glyph.combineAllShapes - START - ' + this.name);

		this.flattenGlyph();

		var cs = combineShapes(this.shapes, donttoast, dontresolveoverlaps);

		if(cs){
			// debug('\t new shapes');

			this.shapes = cs;
			// debug(this.shapes);

			this.changed();

		}
		// debug(this.name + ' \t\t ' + this.shapes.length);

		// debug(' Glyph.combineAllShapes - END - ' + this.name + '\n');
		return this;
	};

	Glyph.prototype.resolveOverlapsForAllShapes = function() {

		var newshapes = [];

		for(var ts=0; ts<this.shapes.length; ts++){
			newshapes = newshapes.concat(this.shapes[ts].resolveSelfOverlaps());
		}

		this.shapes = newshapes;

		this.changed();
	};


//-------------------------------------------------------
// METHODS
//-------------------------------------------------------

	Glyph.prototype.changed = function(descend, ascend) {
		this.cache = {};

		if(ascend){
			for(var g=0; g<this.usedin.length; g++){
				getGlyph(this.usedin[g]).changed(descend, ascend);
			}
		}

		if(descend){
			for(var s=0; s<this.shapes.length; s++) this.shapes[s].changed(descend, ascend);
		}

		this.calcGlyphMaxes();
	};

	Glyph.prototype.map = function(indents) {
		indents = indents || '   ';
		var re = (indents + 'GLYPH ' + this.name + '\n');
		var ts;

		for(var s=0; s < this.shapes.length; s++){
			ts = this.shapes[s];
			if(ts.objtype === 'shape'){
				re += (indents + '-' + s + '-' + ts.name + ' ' + json(ts.path.maxes, true) + '\n');

			} else if(ts.objtype === 'componentinstance'){
				re += (indents+ '~' + s + '~' + ts.name + '\n');
				re += getGlyph(ts.link).map(indents + '   ');
			}
		}

		return re;
	};

	Glyph.prototype.copyShapesTo = function(destinationID, copyGlyphAttributes) {
		// debug('\n Glyph.copyShapesTo - START');

		copyGlyphAttributes = copyGlyphAttributes || { srcAutoWidth: false, srcWidth: false, srcLSB: false, srcRSB: false};
		var destinationGlyph = getGlyph(destinationID, true);
		var tc;

		for(var c=0; c<this.shapes.length; c++){
			tc = this.shapes[c];
			if(tc.objtype === 'componentinstance'){
				addToUsedIn(tc.link, destinationID);
				tc = new ComponentInstance(clone(tc));
			} else if(tc.objtype === 'shape'){
				tc = new Shape(clone(tc));
			}

			destinationGlyph.shapes.push(tc);
		}

		if(copyGlyphAttributes.srcAutoWidth) destinationGlyph.isautowide = this.isautowide;
		if(copyGlyphAttributes.srcWidth) destinationGlyph.glyphwidth = this.glyphwidth;
		if(copyGlyphAttributes.srcLSB) destinationGlyph.leftsidebearing = this.leftsidebearing;
		if(copyGlyphAttributes.srcRSB) destinationGlyph.rightsidebearing = this.rightsidebearing;

		showToast('Copied ' + this.shapes.length + ' shapes');
		destinationGlyph.changed();

		// debug('\t new shapes');
		// debug(destinationGlyph.shapes);
		// debug(' Glyph.copyShapesTo - END\n');
	};

	Glyph.prototype.isHere = function(x, y) {
		for(var s=0; s < this.shapes.length; s++){
			if(this.shapes[s].isHere(x, y)) return true;
		}

		return false;
	};

	Glyph.prototype.hasShapes = function() {
		var tg;
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].objtype !== 'componentinstance') return true;
			else {
				tg = this.shapes[s].getTransformedGlyph();
				if(tg.hasShapes()) return true;
			}
		}

		return false;
	};

	Glyph.prototype.removeShapesWithZeroLengthPaths = function() {
		for(var s=0; s<this.shapes.length; s++){
			if(this.shapes[s].path && this.shapes[s].path.pathpoints.length === 0){
				this.shapes.splice(s, 1);
				s--;
			}
		}
	};

	Glyph.prototype.getPathPoints = function() {
		var points = [];
		this.shapes.forEach(function(shape, i) {
			points = points.concat(shape.path.pathpoints);
		});
		return points;
	};

	Glyph.prototype.getShapes = function() {
		return this.shapes;
	};


//-------------------------------------------------------
// GLYPH FUNCTIONS
//-------------------------------------------------------

	// GET
	function getGlyph(id, create) {
		// debug('\n getGlyph - START');
		// debug('\t passed: ' + id + ' create: ' + create);

		if(!id){
			// debug('\t Not passed an ID, returning false');
			return false;
		}

		if(_GP === {}){
			// debug('\t _GP is uninitialized, returning false');
			return false;
		}

		id = ''+id;
		var rechar;

		if (id.indexOf('0x', 2) > -1){
			rechar = _GP.ligatures[id];
			// debug('\t retrieved ' + rechar + ' from ligatures.');
			if(rechar){
				return rechar;
			} else if(create){
				// debug('\t create was true, returning a new ligature.');
				_GP.ligatures[id] = new Glyph({'glyphhex':id});
				return _GP.ligatures[id];
			}
		} else if(id.indexOf('0x') > -1){
			rechar = _GP.glyphs[id];
			// debug('\t retrieved ' + rechar + ' from glyphs.');
			if(rechar){
				return rechar;
			} else if(create){
				// debug('\t create was true, returning a new char.');
				_GP.glyphs[id] = new Glyph({'glyphhex':id});
				return _GP.glyphs[id];
			}
		} else {
			// debug('\t component, retrieved');
			// debug(_GP.components[id]);
			return _GP.components[id] || false;
		}

		// debug('getGlyph - returning FALSE\n');
		return false;
	}

	function getGlyphType(id) {
		if (id.indexOf('0x', 2) > -1) return 'ligature';
		else if(id.indexOf('0x') > -1) return 'glyph';
		else return 'component';
	}

	function getGlyphName(ch) {
		ch = ''+ch;
		// debug('\n getGlyphName');
		// debug('\t passed ' + ch);

		// not passed an id
		if(!ch){
			// debug('\t not passed an ID, returning false');
			return false;
		}

		// known unicode names
		var un = getUnicodeName(ch);
		if(un && un !== '[name not found]'){
			// debug('\t got unicode name: ' + un);
			return escapeXMLValues(un);
		}

		var cobj = getGlyph(ch);
		if(ch.indexOf('0x',2) > -1){
			// ligature
			// debug('\t ligature - returning ' + hexToHTML(ch));
			return escapeXMLValues(cobj.name) || hexToHTML(ch);
		} else {
			// Component
			// debug('getGlyphName - inexplicably fails, returning [name not found]\n');
			return escapeXMLValues(cobj.name) || '[name not found]';
		}

		// debug(' getGlyphName - returning nothing - END\n');
	}

	function getFirstGlyphID() {
		if(_GP.glyphs['0x0041']) return '0x0041';
		else return getFirstID(_GP.glyphs);
	}

	// GET SELECTED
	function getSelectedGlyphLeftSideBearing(){
		//debug('getSelectedGlyphLeftSideBearing');
		var sc = getSelectedWorkItem();
		if(!sc) return 0;
		if(sc.objtype === 'component') return 0;
		if(!sc.isautowide) return 0;
		if(sc.leftsidebearing === true) sc.leftsidebearing = _GP.projectsettings.defaultlsb;
		return sc.leftsidebearing !== false? sc.leftsidebearing : _GP.projectsettings.defaultlsb;
	}

	function getSelectedGlyphRightSideBearing(){
		//debug('getSelectedGlyphLeftSideBearing');
		var sc = getSelectedWorkItem();
		if(!sc) return 0;
		if(sc.objtype === 'component') return 0;
		if(!sc.isautowide) return 0;
		if(sc.rightsidebearing === true) sc.rightsidebearing = _GP.projectsettings.defaultrsb;
		return sc.rightsidebearing !== false? sc.rightsidebearing : _GP.projectsettings.defaultrsb;
	}

	function updateCurrentGlyphWidth() {
		var sc = getSelectedWorkItem();
		if(!sc) return;
		if(_UI.current_page === 'glyph edit'){
			sc.changed();
		} else if (_UI.current_page === 'components' && sc) {
			var lsarr = sc.usedin;
			if(lsarr) for(var c=0; c<lsarr.length; c++) getGlyph(lsarr[c]).changed();
		}
	}

	// Delete
	function deleteGlyph(id) {
		// debug('\n deleteGlyph');
		// debug('\t passed: ' + id);

		if(!id){
			// debug('\t Not passed an ID, returning false');
			return false;
		}

		if(_GP === {}){
			// debug('\t _GP is uninitialized, returning false');
			return false;
		}

		id = ''+id;
		
		if(_GP.glyphs[id]){
			_GP.glyphs[id].deleteLinks(id);
			delete _GP.glyphs[id];
			// debug(`\t deleted glyph, it is now:`);
			// debug(_GP.glyphs[id]);
			return true;

		} 
		
		return false;
	}
// end of file// start of file
/**
	Object > Shape
	The Shape object is the high level object that
	represents an outline.  The Glyph object treats
	Shape objects and Component Instance objects
	interchangeably - any method added to Shape
	should also be added to Component Instance.
**/


	function Shape(oa){
		// debug('\n SHAPE - START');
		oa = oa || {};
		this.objtype = 'shape';

		// common settings
		this.name = oa.name || 'Shape';
		this.path = isval(oa.path)? new Path(oa.path) : rectPathFromMaxes(false);
		this.visible = isval(oa.visible)? oa.visible : true;
		this.xlock = oa.xlock || false;
		this.ylock = oa.ylock || false;
		this.wlock = oa.wlock || false;
		this.hlock = oa.hlock || false;
		this.ratiolock = oa.ratiolock || false;

		// debug(' SHAPE - END\n');
	}



//	-------------------------------------------------------
//	SHAPE METHODS
//	-------------------------------------------------------

	Shape.prototype.getName = function() { return this.name; };

	Shape.prototype.changed = function() { this.path.changed(); };


//	-------------------------------------------------------
//	DRAWING THE SHAPE
//	-------------------------------------------------------

	Shape.prototype.getName = function() { return this.name; };

	Shape.prototype.drawShape = function(lctx, view){
		// debug('\n Shape.drawShape - START');
		// debug('\t view ' + json(view, true));

		if(this.visible){
			if((this.path.maxes.xmax === -1) &&
					(lctx === _UI.glypheditctx) &&
					(_UI.selectedtool !== 'newpath')) {
				this.calcMaxes();
			}
			this.path.drawPath(lctx, view);
		}

		// debug(' Shape.drawShape - returning true by default - END\n');
		return true;
	};


//	-------------------------------------------------------
//	DRAWING THE SELECTION OUTLINE AND BOUNDING BOX
//	-------------------------------------------------------
	Shape.prototype.draw_PathOutline = function(accent, thickness){
		// debug('\n Shape.draw_PathOutline - START');
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		draw_PathOutline(this, accent, thickness);
	};

	Shape.prototype.draw_BoundingBox = function(accent, thickness) {
		// debug('\n Shape.draw_BoundingBox - START');
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		draw_BoundingBox(this.path.maxes, accent, thickness);
	};

	Shape.prototype.draw_BoundingBoxHandles = function(accent, thickness){
		// debug('\n Shape.draw_BoundingBoxHandles - START');
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		draw_BoundingBoxHandles(this.path.maxes, accent, thickness);
	};


//-------------------------------------------------------
// TRANSLATE TO DIFFERENT LANGUAGES
//-------------------------------------------------------
	Shape.prototype.makeSVG = function(size, gutter) {
		size = size || _UI.thumbsize;
		gutter = gutter || _UI.thumbgutter;
		var upm = _GP.projectsettings.upm;
		var desc = upm - _GP.projectsettings.ascent;
		var charscale = (size-(gutter*2)) / size;
		var gutterscale = (gutter / size) * upm;
		var vbsize = upm - (gutter*2);

		var re = '<svg version="1.1" ';
		re += 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ';
		re += 'width="'+size+'" height="'+size+'" viewBox="0,0,'+vbsize+','+vbsize+'">';
		re += '<g transform="translate('+(gutterscale)+','+(upm-desc-(gutterscale/2))+') scale('+charscale+',-'+charscale+')">';
		// re += '<rect x="0" y="-'+desc+'" height="'+desc+'" width="1000" fill="lime"/>';
		// re += '<rect x="0" y="0" height="'+(upm-desc)+'" width="1000" fill="cyan"/>';
		re += '<path d="';
		re += this.path.getSVGpathData();
		re += '"/>';
		re += '</g>';
		re += '</svg>';

		return re;
	};

	Shape.prototype.genPostScript = function(lastx, lasty){
		return this.path? this.path.genPathPostScript(lastx, lasty) : {'re':'', 'lastx':lastx, 'lasty':lasty};
	};

	Shape.prototype.makeOpenTypeJSpath = function(otpath) { return this.path.makeOpenTypeJSpath(otpath); };


//	-------------------------------------------------------
//	PATH WRAPPER FUNCTIONS FOR COMPONENT INSTANCE PARITY
//	-------------------------------------------------------

	Shape.prototype.updateShapePosition = function(dx, dy, force) { this.path.updatePathPosition(dx, dy, force); };

	Shape.prototype.setShapePosition = function(nx, ny, force) { this.path.setPathPosition(nx, ny, force); };

	Shape.prototype.updateShapeSize = function(dx, dy, ratiolock) { this.path.updatePathSize(dx, dy, ratiolock); };

	Shape.prototype.setShapeSize = function(nx, ny, ratiolock) { this.path.setPathSize(nx, ny, ratiolock); };

	Shape.prototype.isOverControlPoint = function(x, y, nohandles) { return this.path.isOverControlPoint(x, y, nohandles); };

	Shape.prototype.flipEW = function(mid) { this.path.flipEW(mid); };

	Shape.prototype.flipNS = function(mid) { this.path.flipNS(mid); };

	Shape.prototype.rotate = function(angle, about) {
		// debug('\n Shape.rotate - START');
		about = about || this.getCenter();
		this.path.rotate(angle, about);
		// debug('\t first p[0].P.x ' + this.path.pathpoints[0].P.x);
		// debug(' Shape.rotate - END\n');
	};

	Shape.prototype.getCenter = function() {
		var m = this.getMaxes();
		var re = {};
		re.x = ((m.xmax - m.xmin) / 2) + m.xmin;
		re.y = ((m.ymax - m.ymin) / 2) + m.ymin;

		return re;
	};

	Shape.prototype.reverseWinding = function() { this.path.reverseWinding(); };

	Shape.prototype.getMaxes = function() { return this.path.getMaxes(); };

	Shape.prototype.calcMaxes = function() { this.path.calcMaxes(); };

	Shape.prototype.getPath = function() { return clone(this.path); };

	Shape.prototype.getSegment = function(num) { return this.path.getSegment(num); };


//	-------------------------------------------------------
//	NEW SHAPE FUNCTIONS
//	-------------------------------------------------------
	function rectPathFromMaxes(maxes){
		//Default Shape size
		var lx = 0;
		var ty = _GP.projectsettings.ascent;
		var rx = (_GP.projectsettings.upm / _GP.projectsettings.griddivisions);
		var by = 0;

		if(maxes){
			lx = maxes.xmin;
			ty = maxes.ymax;
			rx = maxes.xmax;
			by = maxes.ymin;
		}

		var qw = round((rx-lx)/4);
		var qh = round((ty-by)/4);

		// First Point
		var Pul = new Coord({'x':lx, 'y':ty});
		var H1ul = new Coord({'x':lx, 'y':(ty-qh)});
		var H2ul = new Coord({'x':(lx+qw), 'y':ty});

		// Second Point
		var Pur = new Coord({'x':rx, 'y':ty});
		var H1ur = new Coord({'x':(rx-qw), 'y':ty});
		var H2ur = new Coord({'x':rx, 'y':(ty-qh)});

		// Third Point
		var Plr = new Coord({'x':rx, 'y':by});
		var H1lr = new Coord({'x':rx, 'y':(by+qh)});
		var H2lr = new Coord({'x':(rx-qw), 'y':by});

		// Fourth Point
		var Pll = new Coord({'x':lx, 'y':by});
		var H1ll = new Coord({'x':(lx+qw), 'y':by});
		var H2ll = new Coord({'x':lx, 'y':(by+qh)});

		var patharr = [];
		patharr[0] = new PathPoint({'P':Pul, 'H1':H1ul, 'H2':H2ul});
		patharr[1] = new PathPoint({'P':Pur, 'H1':H1ur, 'H2':H2ur});
		patharr[2] = new PathPoint({'P':Plr, 'H1':H1lr, 'H2':H2lr});
		patharr[3] = new PathPoint({'P':Pll, 'H1':H1ll, 'H2':H2ll});

		var rp = new Path({'pathpoints':patharr, 'leftx':lx, 'rightx':rx, 'topy':ty, 'bottomy':by});
		//debug('RETURNING PATH: ' + JSON.stringify(rp));

		return rp;
	}

	function ovalPathFromMaxes(maxes){
		maxes = maxes || {};

		//Default Circle size
		lx = isval(maxes.xmin)? maxes.xmin : 0;
		ty = isval(maxes.ymax)? maxes.ymax : _GP.projectsettings.xheight || 500;
		rx = isval(maxes.xmax)? maxes.xmax : _GP.projectsettings.xheight || 500;
		by = isval(maxes.ymin)? maxes.ymin : 0;


		var hw = round((rx-lx)/2);
		var hh = round((ty-by)/2);
		var hwd = round(hw*0.448);
		var hhd = round(hh*0.448);

		// First Point - Top
		var Pt = new Coord({'x':(lx+hw), 'y':ty});
		var H1t = new Coord({'x':(lx+hwd), 'y':ty});
		var H2t = new Coord({'x':(rx-hwd), 'y':ty});

		// Second Point - Right
		var Pr = new Coord({'x':rx, 'y':(by+hh)});
		var H1r = new Coord({'x':rx, 'y':(ty-hhd)});
		var H2r = new Coord({'x':rx, 'y':(by-hhd)});

		// Third Point - Bottom
		var Pb = new Coord({'x':(lx+hw), 'y':by});
		var H1b = new Coord({'x':(rx-hwd), 'y':by});
		var H2b = new Coord({'x':(lx+hwd), 'y':by});

		// Fourth Point - Left
		var Pl = new Coord({'x':lx, 'y':(by+hh)});
		var H1l = new Coord({'x':lx, 'y':(by+hhd)});
		var H2l = new Coord({'x':lx, 'y':(ty-hhd)});

		var patharr = [];
		patharr[0] = new PathPoint({'P':Pt, 'H1':H1t, 'H2':H2t, 'type':'symmetric'});
		patharr[1] = new PathPoint({'P':Pr, 'H1':H1r, 'H2':H2r, 'type':'symmetric'});
		patharr[2] = new PathPoint({'P':Pb, 'H1':H1b, 'H2':H2b, 'type':'symmetric'});
		patharr[3] = new PathPoint({'P':Pl, 'H1':H1l, 'H2':H2l, 'type':'symmetric'});

		return new Path({'pathpoints':patharr});
	}


//	-----------------
//	Button Functions
//	-----------------
	function addShape(newshape){
		// debug('addShape - START');
		// debug('\t name: ' + newshape.name);
		// debug('\t objtype: ' + newshape.objtype);

		if(newshape){
			if(newshape.objtype === 'componentinstance'){
				// debug('\t is a Component instance');
				_UI.selectedtool = 'shaperesize';
			} else if(newshape.path && (_UI.selectedtool === 'shaperesize')) {
				// debug('\t triggered as true: newshape.path && _UI.selectedtool == shaperesize \n\t NOT calling calcmaxes, okay?');
				//newshape.calcMaxes();
			}
		} else {
			// debug('\t passed null, creating new shape.');
			newshape = new Shape({});
			newshape.name = ('Rectangle ' + ((getSelectedWorkItemShapes().length*1)+1));
		}

		var sg = getSelectedWorkItem();

		sg.shapes.push(newshape);
		_UI.ms.shapes.select(newshape);
		sg.changed();

		_UI.current_panel = 'npAttributes';

		// debug('\t returns: ' + newshape.name);
		// debug('addShape - END\n');
		return newshape;
	}

	function addBasicShape(type){
		var hd = 50;
		var th = 500;
		var tw = 300;
		var newshape = new Shape({});
		var parr = false;
		var shapetype = 'Shape ';
		var p1,p2,p3,p4;

		if(type === 'oval'){
			p1 = new PathPoint({'P':new Coord({'x':0,'y':(th/2)}), 'H1':new Coord({'x':0,'y':hd}), 'H2':new Coord({'x':0,'y':(th-hd)}), 'type':'symmetric'});
			p2 = new PathPoint({'P':new Coord({'x':(tw/2),'y':th}), 'H1':new Coord({'x':hd,'y':th}), 'H2':new Coord({'x':(tw-hd),'y':th}), 'type':'symmetric'});
			p3 = new PathPoint({'P':new Coord({'x':tw,'y':(th/2)}), 'H1':new Coord({'x':tw,'y':(th-hd)}), 'H2':new Coord({'x':tw,'y':hd}), 'type':'symmetric'});
			p4 = new PathPoint({'P':new Coord({'x':(tw/2),'y':0}), 'H1':new Coord({'x':(tw-hd),'y':0}), 'H2':new Coord({'x':hd,'y':0}), 'type':'symmetric'});
			parr = [p1,p2,p3,p4];
			shapetype = 'Oval ';
		} else {
			p1 = new PathPoint({'P':new Coord({'x':0,'y':0}), 'H1':new Coord({'x':hd,'y':0}), 'H2':new Coord({'x':0,'y':hd})});
			p2 = new PathPoint({'P':new Coord({'x':0,'y':th}), 'H1':new Coord({'x':0,'y':(th-hd)}), 'H2':new Coord({'x':hd,'y':th})});
			p3 = new PathPoint({'P':new Coord({'x':tw,'y':th}), 'H1':new Coord({'x':(tw-hd),'y':th}), 'H2':new Coord({'x':tw,'y':(th-hd)})});
			p4 = new PathPoint({'P':new Coord({'x':tw,'y':0}), 'H1':new Coord({'x':tw,'y':hd}), 'H2':new Coord({'x':(tw-hd),'y':0})});
			parr = [p1,p2,p3,p4];
			shapetype = 'Rectangle ';
		}

		newshape.path = new Path({'pathpoints':parr});
		newshape.name = (shapetype + getSelectedWorkItemShapes().length+1);

		getSelectedWorkItemShapes().push(newshape);
		_UI.ms.shapes.select(newshape);
		updateCurrentGlyphWidth();
	}

	function turnSelectedShapeIntoAComponent(){
		var s = clone(_UI.ms.shapes.getMembers());
		var n = s.length === 1? ('Component ' + s[0].name) : ('Component ' + (getLength(_GP.components)+1));

		_UI.ms.shapes.deleteShapes();
		var newid = createNewComponent(new Glyph({'shapes':s, 'name':n}));
		insertComponentInstance(newid);
		_UI.selectedtool = 'shaperesize';
		selectShape(getSelectedWorkItemShapes().length-1);
		redraw({calledby:'turnSelectedShapeIntoAComponent'});
	}

	function getClickedShape(x,y){
		// debug('\n getClickedShape - START');
		// debug('\t checking x:' + x + ' y:' + y);

		var ts;
		var sws = getSelectedWorkItemShapes();
		for(var j=(sws.length-1); j>=0; j--){
			ts = sws[j];
			// debug('\t Checking shape ' + j);

			if(ts.isHere(x,y)){
				return ts;
			}
		}

		// clickEmptySpace();
		// debug(' getClickedShape - END\n');
		return false;
	}

	function isOverShape(x,y) {
		var sws = getSelectedWorkItemShapes();
		for(var j=(sws.length-1); j>=0; j--){
			if(sws[j].isHere(x,y)) return true;
		}
		return false;
	}


//	-----------------
//	Boolean Combine
//	-----------------

	function combineShapes(shapes, donttoast, dontresolveoverlaps) {
		// debug('\n combineShapes - START');
		// debug(shapes);

		var tempshapes = false;
		
		if(shapes.length <= 1){
			// debug('\t length=1 - returning what was passed');
			return false;
		} else if(shapes.length === 2) {
			tempshapes = combineTwoShapes(shapes[0], shapes[1], donttoast);
			if(!tempshapes) {
				// debug('\t length=2 - returning what was passed');
				if(!donttoast) showToast('The selected shapes do not have overlapping paths.');
				return false;
			} else {
				tempshapes = [tempshapes];	
				// debug('\t length=2 - continuing with tempshapes from combineTwoShapes');
				// debug(tempshapes);
			}
		}


		// One pass through collapsing shapes down
		function singlePass(arr) {
			// debug('\n\t SinglePass');
			// debug('\t\t start arr len ' + arr.length);
			var re;
			var newarr = [];
			var didstuff = false;

			for(var outer=0; outer<arr.length; outer++){ for(var inner=0; inner<arr.length; inner++){
				// debug('\t\t testing shape ' + outer + ' and ' + inner);

				if((outer !== inner) && arr[outer] && arr[inner]){
					re = combineTwoShapes(arr[outer], arr[inner], donttoast);

					// debug('\t\t combineShapes returned ' + (re.length || re));
					if(re !== false){
						newarr.push(re);
						didstuff = true;
						arr[outer] = false;
						arr[inner] = false;
					}
				}
			}}

			newarr = newarr.concat(arr.filter(function(v){return v;}));

			// debug('\t singlepass didstuff = ' + didstuff);

			return {'arr':newarr, 'didstuff':didstuff};
		}



		// Sort shapes by winding

		if(!tempshapes){
			tempshapes = clone(shapes);
			tempshapes.sort(function(a,b){return a.path.getWinding() - b.path.getWinding();});

			// Main collapsing loop
			var looping = true;
			var count = 0;

			while(looping && count < 20){
				looping = false;

				lr = singlePass(tempshapes);
				looping = lr.didstuff;
				if(!looping && count === 0){
					if(!donttoast) showToast('The selected shapes do not have overlapping paths.');
					return false;
				}

				tempshapes = lr.arr;
				// debug('\t didstuff ' + lr.didstuff);
				count++;
			}
		}
		

		// debug(tempshapes);

		var newshapes = [];
		if(dontresolveoverlaps){
			// debug('\t dontresolveoverlaps is true');
			newshapes = tempshapes;
			// debug('\t newshapes is now ');
			// debug(newshapes);
			
		} else {
			// debug('\t dontresolveoverlaps is false, tempshapes.length = ' + tempshapes.length);
			// Collapse each shape's overlapping paths
			for(var ts=0; ts<tempshapes.length; ts++){
				newshapes = newshapes.concat(tempshapes[ts].resolveSelfOverlaps());
			}
			// debug('\t newshapes is now ');
			// debug(newshapes);
		}

		// debug('\t returning');
		// debug(newshapes);

		// debug(' combineShapes - END\n');
		return newshapes;
	}

	function combineTwoShapes(shape1, shape2) {
		// debug('\n combineShapes - START');
		// Find intersections
		var intersections = findPathIntersections(shape1.path, shape2.path);

		if(intersections.length < 1) {
			// debug('\t no intersections, returning.');
			return false;
		}

		// Insert one intersection into both shapes
		var ix = ixToCoord(intersections[0]);

		var p1 = shape1.path.containsPoint(ix);
		if(!p1){
			p1 = shape1.path.getClosestPointOnCurve(ix);
			p1 = shape1.path.insertPathPoint(p1.split, p1.point);
		}
		p1.customid = 'overlap';

		var p2 = shape2.path.containsPoint(ix);
		if(!p2){
			p2 = shape2.path.getClosestPointOnCurve(ix);
			p2 = shape2.path.insertPathPoint(p2.split, p2.point);
		}	
		p2.customid = 'overlap';


		// Walk one shape until the overlap point is found
		// Flip to the other shape, add all the points
		// Flip back to the first shape, add remaining points

		function getPointsBeforeOverlap(path) {
			var re = [];
			var pt = {};

			for(var pp=0; pp<path.pathpoints.length; pp++){
				pt = new PathPoint(path.pathpoints[pp]);

				if(path.pathpoints[pp].customid !== 'overlap') {
					re.push(pt);

				} else {
					return {
						'points': re,
						'overlap': pt
					};
				}
			}
		}

		function getPointsAfterOverlap(path) {
			var re = [];
			var ov = {};

			for(var pp=0; pp<path.pathpoints.length; pp++){
				if(path.pathpoints[pp].customid === 'overlap'){
					ov = new PathPoint(path.pathpoints[pp]);

					for(var pa=(pp+1); pa<path.pathpoints.length; pa++){
						re.push(new PathPoint(path.pathpoints[pa]));
					}

					return {
						'points': re,
						'overlap': ov
					};
				}
			}
		}

		var s1h1 = getPointsBeforeOverlap(shape1.path);
		var s1h2 = getPointsAfterOverlap(shape1.path);
		var s2h1 = getPointsBeforeOverlap(shape2.path);
		var s2h2 = getPointsAfterOverlap(shape2.path);

		var newpoints = [];

		newpoints = newpoints.concat(s1h1.points);

		newpoints.push(
			new PathPoint({
				P: clone(s1h1.overlap.P),
				H1: clone(s1h1.overlap.H1),
				H2: clone(s2h1.overlap.H2),
				type: 'corner',
				useh1: s1h1.overlap.useh1,
				useh2: s2h1.overlap.useh2
			})
		);

		newpoints = newpoints.concat(s2h2.points);
		newpoints = newpoints.concat(s2h1.points);

		newpoints.push(
			new PathPoint({
				P: clone(s2h1.overlap.P),
				H1: clone(s2h1.overlap.H1),
				H2: clone(s1h2.overlap.H2),
				type: 'corner',
				useh1: s2h1.overlap.useh1,
				useh2: s1h2.overlap.useh2
			})
		);

		newpoints = newpoints.concat(s1h2.points);

		// debug(' combineShapes - returning successfully - END\n');

		return new Shape({path: {pathpoints: newpoints}});
	}

	Shape.prototype.resolveSelfOverlaps = function() {
		// debug('\n Shape.resolveSelfOverlaps - START');
		// Add self intersects to path
		var polyseg = this.path.getPolySegment();
		var ix = polyseg.findIntersections();
		// debug('\t intersections');
		// debug(json(ix, true));

		if(ix.length === 0) return new Shape(clone(this));

		var segnum = polyseg.segments.length;

		var threshold = 0.01;
		polyseg.splitSegmentsAtProvidedIntersections(ix, threshold);
		
		if(segnum === polyseg.segments.length) return new Shape(clone(this));

		// debug('\t before filtering ' + polyseg.segments.length);
		polyseg.removeZeroLengthSegments();
		polyseg.removeDuplicateSegments();
		polyseg.removeSegmentsOverlappingShape(this);
		polyseg.removeRedundantSegments();
		polyseg.removeNonConnectingSegments();
		// polyseg.combineInlineSegments();
		// debug('\t afters filtering ' + polyseg.segments.length);

		if(_UI.devmode) polyseg.drawPolySegmentOutline();

		// var reshapes = [];
		// reshapes.push(new Shape({'name':this.name, 'path':polyseg.getPath()}));

		var resegs = polyseg.stitchSegmentsTogether();

		var reshapes = [];
		var psn;
		for(var ps=0; ps<resegs.length; ps++){
			psn = resegs[ps];
			if(psn.segments.length > 1) reshapes.push(new Shape({'name':this.name, 'path':psn.getPath()}));
		}


		// debug(' Shape.resolveSelfOverlaps - END\n');
		return reshapes;
	};


//	----------------------------------------------
//	CANVAS HELPER FUNCTIONS
//	----------------------------------------------
	Shape.prototype.isHere = function(px, py){ return this.path.isHere(px, py); };

	Shape.prototype.isOverBoundingBoxHandle = function(px, py){
		// debug('\n Shape.isOverBoundingBoxHandle - START');
		var c = isOverBoundingBoxHandle(px, py, this.path.maxes);
		// debug('\t Shape.isOverBoundingBoxHandle returning ' + c);
		return c;
	};

	Shape.prototype.changeShapeName = function(sn){
		// debug('\n Shape.changeShapeName - START');
		// debug('\t passed: ' + sn);
		sn = strSan(sn);
		// debug('\t sanitized: ' + sn);

		if(sn !== ''){
			this.name = sn;
			history_put('shape name');
		} else {
			showToast('Invalid shape name - shape names must only contain alphanumeric characters or spaces.');
		}

		redraw({calledby:'Shape Name', redrawcanvas:false});

		// debug(' Shape.changeShapeName - END\n');
	};


//	-----------------------------------
//	HELPER FUNCTIONS
//	------------------------------------

	Shape.prototype.checkPath = function() {
		// debug('CHECKPATH - checking ' + this.name + '\n' + JSON.stringify(this.path));

		for(var pp = 0; pp < this.path.pathpoints.length; pp++){
			var tp = this.path.pathpoints[pp];
			if(!(tp.P.x)) debug(this.name + ' p' + pp + '.P.x is ' + tp.P.x);
			if(!(tp.P.y)) debug(this.name + ' p' + pp + '.P.y is ' + tp.P.y);

			if(!(tp.H1.x)) debug(this.name + ' p' + pp + '.H1.x is ' + tp.H1.x);
			if(!(tp.H1.y)) debug(this.name + ' p' + pp + '.H1.y is ' + tp.H1.y);

			if(!(tp.H2.x)) debug(this.name + ' p' + pp + '.H2.x is ' + tp.H2.x);
			if(!(tp.H2.y)) debug(this.name + ' p' + pp + '.H2.y is ' + tp.H2.y);
		}
	};

	Shape.prototype.checkForNaN = function() {
		return this.path.checkForNaN();
	};

	Shape.prototype.drawSegments = function () {
		var segs = this.path.getPolySegment();
		segs.slowlyDrawSegments();
	};


// end of file// start of file
/**
	Object > Path
	A Path is a collection of Path Points, plus
	a few properties like selected point, winding,
	and maxes.
	Higher level objects should only have access to
	a Shape object, not direct access to a Shape's
	Path object. This is to enable Shape objects and
	Component Instance objects to be used
	interchangeably, even though Component Instance
	objects don't have a Path.
**/

	function Path(oa){
		// debug('\n PATH - START');
		oa = oa || {};
		this.objtype = 'path';

		// declare attributes
		// this.pathpoints = false;
		this.pathpoints = [];
		if(oa.pathpoints && oa.pathpoints.length){
			//debug('NEW PATH : Hydrating Path Points, length ' + oa.pathpoints.length);
			for (var i = 0; i < oa.pathpoints.length; i++) {
				this.pathpoints[i] = new PathPoint(oa.pathpoints[i]);
				this.pathpoints[i].parentpath = this;
			}
		}

		this.winding = isval(oa.winding)? oa.winding : this.findWinding();

		// internal
		this.maxes = oa.maxes || clone(_UI.mins);

		// cache
		oa.cache = oa.cache || {};
		this.cache = {};
		this.cache.segments = oa.cache.segments || [];
		this.cache.segmentlengths = oa.cache.segmentlengths || [];

		// Setup the object
		if(this.pathpoints && this.calcMaxes) this.calcMaxes();

		// debug(' PATH - END\n');
	}



//  -----------------------------------
//  SIZE AND POSSITION
//  -----------------------------------

	Path.prototype.setPathSize = function(nw, nh, ratiolock){
		if(nw !== false) nw = parseFloat(nw);
		if(nh !== false) nh = parseFloat(nh);
		var dw = (nw !== false)? (nw - this.getWidth()) : 0;
		var dh = (nh !== false)? (nh - this.getHeight()) : 0;
		this.updatePathSize(dw, dh, ratiolock);
	};

	Path.prototype.updatePathSize = function(dw, dh, ratiolock){
		// debug('\n Path.updatePathSize - START');
		// debug('dw,dh,rl\t'+dw+' , '+dh+' , '+ratiolock);

		dw = parseFloat(dw) || 0;
		dh = parseFloat(dh) || 0;

		if(!dw && !dh) return;

		// Lock Aspect Ratio
		if(ratiolock){
			if(dw !== dh){
				var ratio = this.getWidth() / this.getHeight();
				if(Math.abs(dw) > Math.abs(dh)){
					dh = dw / ratio;
				} else {
					dw = dh * ratio;
				}
			}
		}

		// debug('\t dw / dh is now ' + dw + ' / ' + dh);

		var oldw = this.getWidth();
		if(oldw === 0) oldw = 1;
		var oldh = this.getHeight();
		if(oldh === 0) oldh = 1;

		var neww = Math.max((oldw + dw), 1);
		var newh = Math.max((oldh + dh), 1);

		var ratiodh = (newh/oldh);
		var ratiodw = (neww/oldw);

		// If ratiolocked, keep both w&h from min'ing out at 1
		if(ratiolock){
			if(neww <= 1 || newh <=1) {
				// debug('\t RETURNING: ratiolock forcing width or height to be less than 1.');
				return;
			}
		}

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x =   (((pp.P.x  - this.maxes.xmin) * ratiodw) + this.maxes.xmin);
			pp.H1.x =  (((pp.H1.x - this.maxes.xmin) * ratiodw) + this.maxes.xmin);
			pp.H2.x =  (((pp.H2.x - this.maxes.xmin) * ratiodw) + this.maxes.xmin);
			pp.P.y =   (((pp.P.y  - this.maxes.ymin) * ratiodh) + this.maxes.ymin);
			pp.H1.y =  (((pp.H1.y - this.maxes.ymin) * ratiodh) + this.maxes.ymin);
			pp.H2.y =  (((pp.H2.y - this.maxes.ymin) * ratiodh) + this.maxes.ymin);
		}

		if(this.checkForNaN()){
			// debug('\t NAN FOUND IN THIS PATH');
			// debug('\t this.maxes = ' + json(this.maxes));
			// debug('oldw = ' + oldw);
			// debug('oldh = ' + oldh);
			// debug('neww = ' + neww);
			// debug('newh = ' + newh);
			// debug('ratiodh = ' + ratiodh);
			// debug('ratiodw = ' + ratiodw);
		}

		this.calcMaxes();
		// debug(' Path.updatePathSize - END\n');
	};

	Path.prototype.setPathPosition = function(nx, ny, force){
		// debug('\n Path.setPathPosition - START');
		// debug('\t nx ny force:\t ' + nx + '\t ' + ny + '\t ' + force);

		if(nx !== false) nx = parseFloat(nx);
		if(ny !== false) ny = parseFloat(ny);

		var dx = (nx !== false)? ((nx*1) - this.maxes.xmin) : 0;
		var dy = (ny !== false)? ((ny*1) - this.maxes.ymax) : 0;
		// debug('\t dx dy: ' + dx + ' ' + dy);

		this.updatePathPosition(dx,dy,force);

		// debug(' Path.setPathPosition - END\n');
	};

	Path.prototype.updatePathPosition = function(dx, dy, force){
		// debug('\n Path.updatePathPosition - START');
		force = isval(force)? force : false;
		if(dx !== false) dx = parseFloat(dx) || 0;
		if(dy !== false) dy = parseFloat(dy) || 0;
		// debug('\t dx, dy, f\t'+dx+'\t'+dy+'\t'+force);

		for(var d=0; d<this.pathpoints.length; d++){
			var pp = this.pathpoints[d];
			//debug('-------------------- pathPoint #' + d);
			pp.updatePathPointPosition('P',dx,dy,force);
		}

		this.changed();
		// debug(' Path.updatePathPosition - END\n');
	};

	Path.prototype.getWinding = function() {
		if(!isval(this.winding)){
			if (this.findWinding) this.findWinding();
			else this.winding = 0;
		}
		 return this.winding;
	};

	Path.prototype.getHeight = function() {
		var h = this.maxes.ymax - this.maxes.ymin;
		return Math.max(h, 0);
	};

	Path.prototype.getWidth = function() {
		var w = this.maxes.xmax - this.maxes.xmin;
		return Math.max(w, 0);
	};

	Path.prototype.getMaxes = function() {
		// debug('\n Path.getMaxes - START');

		if(hasNonValues(this.maxes)){
			// debug('\t no cache, calcMaxes');
			this.calcMaxes();
		}

		// debug('\t returning ' + json(this.maxes, true));
		// debug(' Path.getMaxes - END\n');

		return clone(this.maxes);
	};

	Path.prototype.rotate = function(angle, about) {
		// debug('\n Path.rotate - START');
		for(var d=0; d<this.pathpoints.length; d++){
			// debug('\t starting point ' + d);
			var pp = this.pathpoints[d];
			pp.rotate(angle, about);
			// debug('\t p['+d+'].P.x ' + pp.P.x);
		}
		this.changed();
		// debug(' Path.rotate - END\n');
	};

	Path.prototype.isHere = function(px, py) {
		var gctx = _UI.ishereghostctx;

		gctx.clearRect(0,0,_UI.glypheditcanvassize,_UI.glypheditcanvassize);
		gctx.fillStyle = 'rgba(0,0,255,0.2)';
		gctx.beginPath();
		this.drawPath(gctx);
		gctx.closePath();
		gctx.fill();

		var imageData = gctx.getImageData(px, py, 1, 1);
		// debug('ISHERE? alpha = ' + imageData.data[3] + '  returning: ' + (imageData.data[3] > 0));
		return (imageData.data[3] > 0);
	};


//  -----------------------------------
//  METHODS
//  -----------------------------------

	Path.prototype.getNextPointNum = function(pnum) {
		pnum = parseInt(pnum) || 0;
		pnum += 1;
		pnum = pnum % this.pathpoints.length;

		return pnum;
	};

	Path.prototype.getPreviousPointNum = function(pnum) {
		pnum = parseInt(pnum) || 0;
		pnum -= 1;
		if(pnum < 0) pnum = pnum + this.pathpoints.length;

		return pnum;
	};

	Path.prototype.changed = function() {
		this.cache = {};
		this.calcMaxes();
	};


//	-----------------------------------
// 	Boolean Combine
//	-----------------------------------

	function findPathIntersections(p1, p2, onlyfirst) {
		// debug('\n findPathIntersections - START');
		var intersects = [];

		// Find overlaps at boundaries
		intersects = intersects.concat(findPathPointIntersections(p1, p2, onlyfirst));
		if(intersects[0] && onlyfirst) return intersects[0];

		intersects = intersects.concat(findPathPointBoundaryIntersections(p1, p2, onlyfirst));
		if(intersects[0] && onlyfirst) return intersects[0];

		intersects = intersects.filter(duplicates);
		// debug('\t intersections');
		// debug(intersects);

		// Maxes within boundaries
		if(!maxesOverlap(p1.getMaxes(), p2.getMaxes())) {
			// debug(' findPathIntersections - paths dont\'t overlap - END\n');
			// debug(p1.getMaxes());
			// debug(p2.getMaxes());
			return intersects;
		}

		// Continue with recursive overlap detection
		var bs, ts;
		var segoverlaps = [];
		function pushSegOverlaps(p1, p1p, p2, p2p) {
			// debug('\t pushSegOverlaps - p1p ' + p1p + ' - p2p ' + p2p);
			bs = p1.getSegment(p1p);
			ts = p2.getSegment(p2p);


			if(maxesOverlap(bs.getFastMaxes(), ts.getFastMaxes())){
				// debug('\t\t pushed!');
				// bs.drawSegmentOutline();
				// ts.drawSegmentOutline();
				segoverlaps.push({'bottom':bs, 'top':ts});
			}
		}

		// Find overlaps within a single segment -- don't care about this case
		// Find overlaps within a single path -- don't care about this case

		// Find overlaps between two paths
		for(var bpp=0; bpp < p1.pathpoints.length; bpp++){
			for(var tpp=0; tpp < p2.pathpoints.length; tpp++){
				pushSegOverlaps(p1, bpp, p2, tpp);
			}
		}

		// debug('\t segoverlaps ');
		// debug(json(segoverlaps));

		// Use overlaps to find intersections
		var re = [];
		for(var v=0; v<segoverlaps.length; v++){
			// debug('\n\t SEGOVERLAPS ' + v);
			re = findSegmentIntersections(segoverlaps[v].bottom, segoverlaps[v].top, 0);
			if(re.length > 0) {
				if(onlyfirst) return re[0];
				else intersects = intersects.concat(re);
			}
			// debug('\t intersects is now');
			// debug(intersects);
		}

		// debug('\t pre filter ' + intersects);
		intersects = intersects.filter(duplicates);

		// debug('\t returning ' + intersects);
		// debug(' findPathIntersections - END\n');
		return intersects;
	}

	function findPathPointBoundaryIntersections(p1, p2, onlyfirst) {
		re = [];

		function check(chk, against) {
			var m = against.getMaxes();
			var tpp;
			for(var pp=0; pp<chk.pathpoints.length; pp++){
				tpp = chk.pathpoints[pp];
				if(	(tpp.P.x === m.xmin) || (tpp.P.x === m.xmax) ||
					(tpp.P.y === m.ymin) || (tpp.P.y === m.ymax) ){
					if(against.isHere(sx_cx(tpp.P.x), sy_cy(tpp.P.y))){
						re.push(''+tpp.P.x+'/'+tpp.P.y);
					}
				}
			}
		}

		check(p1, p2);
		check(p2, p1);

		re = re.filter(duplicates);

		return re;
	}

	function findPathPointIntersections(p1, p2, onlyfirst) {
		// debug('\n findPathPointIntersections - START');
		var precision = 4;
		var re = [];

		for(var pp1=0; pp1<p1.pathpoints.length; pp1++){
			for(var pp2=0; pp2<p2.pathpoints.length; pp2++){
				if(coordsAreEqual(p1.pathpoints[pp1].P, p2.pathpoints[pp2].P, 0.01)){
					re.push(''+p1.pathpoints[pp1].P.x+'/'+p1.pathpoints[pp1].P.y);
				}
			}
		}

		re = re.filter(duplicates);

		// debug('\t returning ' + re);
		// debug(' findPathPointIntersections - END\n');
		return re;
	}

	Path.prototype.addPointsAtPathIntersections = function() {
		var polyseg = this.getPolySegment();

		polyseg.splitSegmentsAtIntersections();

		var newpath = polyseg.getPath();

		this.pathpoints = clone(newpath.pathpoints);
	};

	Path.prototype.containsPoint = function(c, wantsecond) {

		for(var pp=0; pp<this.pathpoints.length; pp++){
			if(coordsAreEqual(c, this.pathpoints[pp].P, 0.01)) {
				if(wantsecond) wantsecond = false;
				else return this.pathpoints[pp];
			}
		}
		return false;
	};

	function maxesOverlap(m1, m2, bx) {
		bx = bx || 'exclusive';
		var re;

		if(bx === 'inclusive') re = (m1.xmin <= m2.xmax && m1.xmax >= m2.xmin && m1.ymin <= m2.ymax && m1.ymax >= m2.ymin);
		else if (bx === 'exclusive') re = (m1.xmin < m2.xmax && m1.xmax > m2.xmin && m1.ymin < m2.ymax && m1.ymax > m2.ymin);
		// var iny = (m1.xmin < m2.xmax && m1.xmax > m2.xmin && m1.ymin <= m2.ymax && m1.ymax >= m2.ymin);
		// var inx = (m1.xmin <= m2.xmax && m1.xmax >= m2.xmin && m1.ymin < m2.ymax && m1.ymax > m2.ymin);
		// var equ = (JSON.stringify(m1)===JSON.stringify(m2));

		return re;
	}


//  -----------------------------------
//  DRAWING
//  -----------------------------------

	Path.prototype.drawPath = function(lctx, view) {
		// debug('\n Path.drawPath - START');
		// debug('\t view ' + json(view, true));

		var snap = _GP.projectsettings.renderpointssnappedtogrid;
		var currview = getView('Path.drawPath');
		view = view || clone(currview);
		setView(view);

		if(this.pathpoints === false || this.pathpoints.length < 2) return;
		var pp, np, pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy;

		if(snap) lctx.moveTo(sx_cx(round(this.pathpoints[0].P.x)), sy_cy(round(this.pathpoints[0].P.y)));
		else lctx.moveTo(sx_cx(this.pathpoints[0].P.x), sy_cy(this.pathpoints[0].P.y));

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			pp = this.pathpoints[cp];
			// np = this.pathpoints[(cp+1) % this.pathpoints.length];
			np = this.pathpoints[this.getNextPointNum(cp)];

			if(pp.type === 'symmetric') { pp.makeSymmetric('H1'); }
			else if (pp.type === 'flat') { pp.makeFlat('H1'); }

			// this.validate('DRAW PATH');

			if(snap){
				pph2x = sx_cx(round(pp.getH2x()));
				pph2y = sy_cy(round(pp.getH2y()));
				nxh1x = sx_cx(round(np.getH1x()));
				nxh1y = sy_cy(round(np.getH1y()));
				nxppx = sx_cx(round(np.P.x));
				nxppy = sy_cy(round(np.P.y));
			} else {
				pph2x = sx_cx(pp.getH2x());
				pph2y = sy_cy(pp.getH2y());
				nxh1x = sx_cx(np.getH1x());
				nxh1y = sy_cy(np.getH1y());
				nxppx = sx_cx(np.P.x);
				nxppy = sy_cy(np.P.y);
			}

			// debug('\t curve ' + pph2x +' '+ pph2y +' '+ nxh1x +' '+ nxh1y +' '+ nxppx +' '+ nxppy);
			lctx.bezierCurveTo(pph2x, pph2y, nxh1x, nxh1y, nxppx, nxppy);
		}

		setView(currview);
		// debug(' Path.drawPath - END\n');
	};


//  -----------------------------------
//  TRANSLATE TO OTHER LANGUAGES
//  -----------------------------------

	Path.prototype.genPathPostScript = function(lastx, lasty){
		if(!this.pathpoints) return {'re':'', 'lastx':lastx, 'lasty':lasty};

		var p1, p2, p1h2x, p1h2y, p2h1x, p2h1y, p2ppx, p2ppy;
		var trr = '';

		var re = '\t\t\t\t' + (this.pathpoints[0].P.x - lastx) + ' ' + (this.pathpoints[0].P.y - lasty) + ' rmoveto \n';

		//debug('GENPATHPOSTSCRIPT:\n\t ' + re);

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			p1 = this.pathpoints[cp];
			// p2 = this.pathpoints[(cp+1) % this.pathpoints.length];
			p2 = this.pathpoints[this.getNextPointNum(cp)];

			p1h2x = p1.getH2x() - p1.P.x;
			p1h2y = p1.getH2y() - p1.P.y;
			p2h1x = p2.getH1x() - p1.getH2x();
			p2h1y = p2.getH1y() - p1.getH2y();
			p2ppx = p2.P.x - p2.getH1x();
			p2ppy = p2.P.y - p2.getH1y();

			trr = '\t\t\t\t' + p1h2x + ' ' + p1h2y + ' ' + p2h1x + ' ' + p2h1y + ' ' + p2ppx + ' ' + p2ppy + ' rrcurveto \n';

			//debug('\t ' + trr);

			re += trr;
		}

		return {
			're' : re,
			'lastx' : p2.P.x,
			'lasty' : p2.P.y
		};
	};

	Path.prototype.getSVGpathData = function() {
		if(this.cache.svgpathdata) return this.cache.svgpathdata;

		this.cache.svgpathdata = this.makeSVGpathData();

		return this.cache.svgpathdata;
	};

	Path.prototype.makeSVGpathData = function(glyphname) {
		glyphname = glyphname || 'not specified';
		// debug('\n Path.makeSVGpathData - START');
		// debug('\t Glyph ' + glyphname);
		// debug('\t this.pathpoints: ' + json(this.pathpoints, true));

		if(!this.pathpoints || !this.pathpoints.length) return '';

		var re = '';
		var roundvalue = _GP.projectsettings.svgprecision || 8;
		var p1, p2;
		var trr = '';

		re += 'M' + round(this.pathpoints[0].getPx(), roundvalue) + ',' + round(this.pathpoints[0].getPy(), roundvalue);
		// debug('GENPATHPOSTSCRIPT:\n\t ' + re);

		if(re.indexOf('NaN') > -1){
			console.warn(glyphname + ' PathPoint 0 MOVE has NaN: ' + re);
			// debug(this.pathpoints[0]);
		}

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			p1 = this.pathpoints[cp];
			// p2 = this.pathpoints[(cp+1) % this.pathpoints.length];
			p2 = this.pathpoints[this.getNextPointNum(cp)];
			trr = ' C' + round(p1.getH2x(), roundvalue) + ',' + round(p1.getH2y(), roundvalue) + ',' + round(p2.getH1x(), roundvalue) + ',' + round(p2.getH1y(), roundvalue) + ',' + round(p2.getPx(), roundvalue) + ',' + round(p2.getPy(), roundvalue);
			// debug('\t ' + trr);

			if(trr.indexOf('NaN') > -1){
				console.warn(glyphname + ' PathPoint ' + cp + ' has NaN: ' + trr);
			}
			re += trr;
		}

		re += 'Z';
		// debug('\t returning: ' + re);
		// debug('Path.makeSVGpathData - END\n');
		return re;
	};

	Path.prototype.makeOpenTypeJSpath = function(otpath) {
		// debug('\n Path.makeOpenTypeJSpath - START');
		// debug('\t otpath: ' + json(otpath));

		otpath = otpath || new opentype.Path();
		var p1, p2;

		if(!this.pathpoints) {
			if(this.pathpoints.length === 0){
				// debug('\t !!!Path has zero points!');
			}

			otpath.close();
			return otpath;
		}

		otpath.moveTo(round(this.pathpoints[0].P.x), round(this.pathpoints[0].P.y));

		for(var cp = 0; cp < this.pathpoints.length; cp++){
			p1 = this.pathpoints[cp];
			// p2 = this.pathpoints[(cp+1) % this.pathpoints.length];
			p2 = this.pathpoints[this.getNextPointNum(cp)];
			otpath.curveTo(
				round(p1.getH2x()),
				round(p1.getH2y()),
				round(p2.getH1x()),
				round(p2.getH1y()),
				round(p2.P.x),
				round(p2.P.y)
			);
		}

		otpath.close();

		// debug('\t returning path ' + json(otpath));
		// debug(' Path.makeOpenTypeJSpath - END\n');
		return otpath;
	};

	Path.prototype.getSegment = function(num) {
		// debug('\n Path.getSegment - START');
		// debug('\t passed ' + num);

		// make a segment
		num = num || 0;
		num = num % this.pathpoints.length;

		// check cache
		if(this.cache.segments && this.cache.segments[num]) return this.cache.segments[num];
		else this.cache.segments = [];

		// debug('\t validated as ' + num);

		var pp1 = this.pathpoints[num];
		// var pp2 = this.pathpoints[(num+1)%this.pathpoints.length];
		var pp2 = this.pathpoints[this.getNextPointNum(num)];

		var re = new Segment({
			'p1x':pp1.P.x, 'p1y':pp1.P.y,
			'p2x':pp1.getH2x(), 'p2y':pp1.getH2y(),
			'p3x':pp2.getH1x(), 'p3y':pp2.getH1y(),
			'p4x':pp2.P.x, 'p4y':pp2.P.y
		});

		this.cache.segments[num] = re;

		// debug([re, re2]);
		// debug(' Path.getSegment - END\n');
		return re;
	};

	Path.prototype.getQuickSegmentLength = function(num) {
		var re = this.getSegment(num);
		re = re.getQuickLength();

		return re;
	};

	Path.prototype.getPolySegment = function() {
		var seg = [];
		for(var pp=0; pp<this.pathpoints.length; pp++){
			seg.push(this.getSegment(pp));
		}
		return new PolySegment({segments: seg});
	};


//  -----------------------------------
//  CANVAS HELPER FUNCTIONS
//  -----------------------------------

	Path.prototype.isOverControlPoint = function(x, y, nohandles){
		var a = this.pathpoints || [];
		var re = false;

		for(var k=a.length-1; k>=0; k--){
			re = a[k].isOverControlPoint(x, y, nohandles);
			if(re) return re;
		}

		return false;
	};

	Path.prototype.isOverFirstPoint = function(x, y) {
		// debug('\n Path.isOverFirstPoint - START');
		// debug('\t Passed ' + x + '/' + y);
		var a = this.pathpoints[0];

		var hp = _GP.projectsettings.pointsize/getView('Path.isOverFirstPoint').dz;
		// debug('\t Checking ' + a.P.x + '/' + a.P.y + ' around ' + hp);

		if(!a) return false;

		if( ((a.P.x+hp) > x) && ((a.P.x-hp) < x) && ((a.P.y+hp) > y) && ((a.P.y-hp) < y) ){
			// debug(' Path.isOverFirstPoint - END - return TRUE\n');
			return true;
		}

		// debug(' Path.isOverFirstPoint - END - return FALSE\n');
		return false;
	};

	Path.prototype.findWinding = function(secondtry){
		// debug('\n Path.findWinding - START');
		var j,k,z;
		var count = -1;
		var parr = this.pathpoints;

		if (parr.length === 2){
			count = parr[1].P.x > parr[0].P.x? -1 : 1;

		} else if (parr.length > 2){
			for (var i=0; i<parr.length; i++) {
				j = (i + 1) % parr.length;
				k = (i + 2) % parr.length;
				z  = (parr[j].P.x - parr[i].P.x) * (parr[k].P.y - parr[j].P.y);
				z -= (parr[j].P.y - parr[i].P.y) * (parr[k].P.x - parr[j].P.x);

				if (z < 0) count--;
				else if (z > 0) count++;
			}
		}

		// negative = clockwise
		// positive = counterclockwise

		if(count === 0 && !secondtry){
			// debug('\t second try...');
			this.reverseWinding();
			count = this.findWinding(true) * -1;
			this.reverseWinding();
		}

		this.winding = count;

		// if(!secondtry) debug(' Path.findWinding - END returning: ' + count + '\n');

		return count;
	};

	Path.prototype.reverseWinding = function(){
		// debug('\n Path.reverseWinding - START');
		var HT,pp;
		if(this.pathpoints){
			for (var i = 0; i < this.pathpoints.length; i++) {
				pp = this.pathpoints[i];
				HT = pp.H1;
				pp.H1 = pp.H2;
				pp.H2 = HT;
				if(pp.useh1 !== pp.useh2){
					pp.useh1 = !pp.useh1;
					pp.useh2 = !pp.useh2;
				}
			}
			this.pathpoints.reverse();
			this.winding *= -1;
			if(this.winding === 0 || !isval(this.winding)) this.findWinding(true);
		}
		// debug(' Path.reverseWinding - END\n');
	};

	Path.prototype.flipNS = function(mid){
		var ly = this.maxes.ymax;

		mid = isval(mid)? mid : (this.getHeight()/2)+this.maxes.ymin;
		//debug('FLIPNS - calculating mid: (b-t)/2 + t = mid: ' + this.maxes.ymin +','+ this.maxes.ymax + ','+ mid);

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.y += ((mid-pp.P.y)*2);
			pp.H1.y += ((mid-pp.H1.y)*2);
			pp.H2.y += ((mid-pp.H2.y)*2);
		}

		this.setPathPosition(false, ly);
		this.reverseWinding();
	};

	Path.prototype.flipEW = function(mid){
		var lx = this.maxes.xmin;

		mid = isval(mid)? mid : (this.getWidth()/2)+this.maxes.xmin;
		//debug('flipEW - calculating mid: (b-t)/2 + t = mid: ' + this.maxes.xmax +','+ this.maxes.xmin +','+ mid);

		for(var e=0; e<this.pathpoints.length; e++){
			var pp = this.pathpoints[e];
			pp.P.x += ((mid-pp.P.x)*2);
			pp.H1.x += ((mid-pp.H1.x)*2);
			pp.H2.x += ((mid-pp.H2.x)*2);
		}

		this.setPathPosition(lx, false);
		this.reverseWinding();
	};

	Path.prototype.addPathPoint = function(newpp, addtostart){
		// debug('\n Path.addPathPoint - START');
		// debug('\t newpp = ' + newpp);
		var re = false;

		if(!newpp) {
			// No pathpoint passed to function - make a new one
			newpp = new PathPoint();
			newpp.parentpath = this;
			newpp.H1.x = newpp.P.x;
			newpp.H1.y = newpp.P.y-100;
			newpp.H2.x = newpp.P.x+100;
			newpp.H2.y = newpp.P.y;

			if(addtostart){
				//Adds new pathpoint to start of path
				if(this.pathpoints.length > 0){
					var firstpp = this.pathpoints[0];

					newpp.P.x = firstpp.P.x-200;
					newpp.P.y = firstpp.P.y-200;
				}

				this.pathpoints.unshift(newpp);
				re = this.selectPathPoint(0);

			} else {
				// Adds new pathpoint to end of path
				if(this.pathpoints.length > 0){
					var lastpp = this.pathpoints[this.pathpoints.length-1];

					newpp.P.x = lastpp.P.x+200;
					newpp.P.y = lastpp.P.y+200;
				}

				this.pathpoints.push(newpp);
				re = this.selectPathPoint(this.pathpoints.length-1);
			}
		} else {
			// Function was passed a new path point
			newpp.parentpath = this;
			this.pathpoints.push(newpp);
			re = this.selectPathPoint(this.pathpoints.length-1);
		}

		this.findWinding();
		// debug('\t calling calcMaxes');
		this.changed();

		// debug(' Path.addPathPoint - END - returning ' + re + '\n');
		return re;
	};

	Path.prototype.insertPathPoint = function(t, pointnum) {
		var pp1i = pointnum || 0;
		var pp1 = (pp1i === false ? this.pathpoints[0] : this.pathpoints[pp1i]);
		// var pp2i = (pp1i+1)%this.pathpoints.length;
		var pp2i = this.getNextPointNum(pp1i);
		var pp2 = this.pathpoints[pp2i];
		var nP, nH1, nH2, ppn;

		if(this.pathpoints.length > 1){
			var splits = this.getSegment(pp1i).split(t);
			var s1 = splits[0];
			var s2 = splits[1];

			// New Point
			nP = new Coord({'x':s1.p4x, 'y':s1.p4y});
			nH1 = new Coord({'x':s1.p3x, 'y':s1.p3y});
			nH2 = new Coord({'x':s2.p2x, 'y':s2.p2y});
			ppn = new PathPoint({'P':nP, 'H1':nH1, 'H2':nH2, 'type':'flat', 'useh1':true, 'useh2':true});
			ppn.round();

			// Update P1
			if(pp1.type === 'symmetric') pp1.type = 'flat';
			pp1.H2.x = s1.p2x;
			pp1.H2.y = s1.p2y;
			pp1.round();

			// Update P2
			if(pp2.type === 'symmetric') pp2.type = 'flat';
			pp2.H1.x = s2.p3x;
			pp2.H1.y = s2.p3y;
			pp2.round();

		} else {
			//just make a random point
			var d = 100;
			nP = new Coord({'x':pp1.P.x+d, 'y':pp1.P.y+d});
			nH1 = new Coord({'x':pp1.getH2x()+d, 'y':pp1.getH2y()+d});
			nH2 = new Coord({'x':pp1.getH1x()+d, 'y':pp1.getH1y()+d});
			ppn = new PathPoint({'P':nP, 'H1':nH1, 'H2':nH2, 'type':pp1.type});
		}

		// Insert
		ppn.parentpath = this;
		this.pathpoints.splice(pp2i, 0, ppn);
		// this.selectPathPoint(pp2i);

		this.changed();
		return ppn;
	};

	Path.prototype.getClosestPointOnCurve = function(coord, wantsecond) {
		var grains = 10000;
		var first = false;
		var second = false;
		var mindistance = 999999999;
		var check, d, seglen;

		for(var pp=0; pp<this.pathpoints.length; pp++){
			// grains = this.cache.segmentlengths[pp] * 100;
			grains = this.getSegment(pp).getQuickLength() * 100;

			for(var t=0; t<1; t+=(1/grains)){
				check = this.getCoordFromSplit(t, pp);
				d = Math.sqrt( ((check.x-coord.x)*(check.x-coord.x)) + ((check.y-coord.y)*(check.y-coord.y)) );
				if(d < mindistance){
					if(first && first.point !== pp) second = clone(first);
					mindistance = d;
					first = {
						'point' : pp,
						'split' : t,
						'distance' : d,
						'x' : check.x,
						'y' : check.y
					};
				}
			}
		}

		return wantsecond? second : first;
	};

	Path.prototype.getCoordFromSplit = function(t, pointnum) {
		if(this.pathpoints.length > 1){
			var seg = this.getSegment(pointnum);
			return seg.getCoordFromSplit(t);

		} else {
			return this.pathpoints[0].P;
		}
	};

	Path.prototype.selectPathPoint = function(index){
		index = parseInt(index);

		if(index === false){
			return false;
		} else {
			if(index === -1) index = this.pathpoints.length-1;
			else index = Math.abs(index);

			index = index % this.pathpoints.length;

			_UI.ms.points.select(this.pathpoints[index]);

			return this.pathpoints[index];
		}
	};



//	----------------------------------
//	Calc Maxes
//	----------------------------------

	Path.prototype.calcMaxes = function(){
		// debug('\n Path.calcMaxes - START');
		// debug('\t before ' + json(this.maxes, true));

		this.maxes = clone(_UI.mins);

		var seg, tbounds;

		for(var s=0; s<this.pathpoints.length; s++){
			// debug('\t ++++++ starting seg ' + s);

			seg = this.getSegment(s);
			tbounds = seg.getMaxes();

			// debug('\t tseg maxes ' + json(tbounds, true));
			// debug('\t this maxes ' + json(this.maxes, true));

			this.maxes = getOverallMaxes([this.maxes, tbounds]);

			// debug('\t path maxes is now ' + json(this.maxes, true));

			this.cache.segments[s] = seg;

			// debug('\t ++++++ ending seg ' + s);
		}

		this.maxes.xmax = round(this.maxes.xmax, 4);
		this.maxes.xmin = round(this.maxes.xmin, 4);
		this.maxes.ymax = round(this.maxes.ymax, 4);
		this.maxes.ymin = round(this.maxes.ymin, 4);

		// debug('\t afters ' + json(this.maxes, true));
		// debug(' Path.calcMaxes - END\n');
	};



//  -----------------------------------
//  HELPER FUNCTIONS
//  -----------------------------------

	Path.prototype.validate = function(calledby){
		var tp;
		for(var pp=0; pp<this.pathpoints.length; pp++){
			tp = this.pathpoints[pp];
			if(!tp.P.x && tp.P.x !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' P.x from ' + tp.P.x);
				tp.P.x = 0;
			}
			if(!tp.P.y && tp.P.y !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' P.y from ' + tp.P.y);
				tp.P.y = 0;
			}
			if(!tp.H1.x && tp.H1.x !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' H1.x from ' + tp.H1.x);
				tp.H1.x = 0;
			}
			if(!tp.H1.y && tp.H1.y !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' H1.y from ' + tp.H1.y);
				tp.H1.y = 0;
			}
			if(!tp.H2.x && tp.H2.x !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' H2.x from ' + tp.H2.x);
				tp.H2.x = 0;
			}
			if(!tp.H2.y && tp.H2.y !== 0){
				//debug('VALIDATE PATH: '+calledby+' - resetting point '+pp+' H2.y from ' + tp.H2.y);
				tp.H2.y = 0;
			}

			tp.roundAll();
		}
	};

	Path.prototype.checkForNaN = function() {
		for(var pp = 0; pp < this.pathpoints.length; pp++){
			var tp = this.pathpoints[pp];
			if( isNaN(tp.P.x) || isNaN(tp.P.y) ||
				isNaN(tp.H1.x) || isNaN(tp.H1.y) ||
				isNaN(tp.H2.x) || isNaN(tp.H2.y) ){
				return true;
			}
		}
		return false;
	};

// end of file// start of file
/**
	Object > Path Point
	A collection of these units make up a Path,
	they have position and handles (or control
	points). There are a few Path Point types, and
	individual handles can be shown or hidden.

	(bottm of the file)
	Object > Coordinate
	A mini object that holds x/y position, as well
	as if that point is locked or not.
**/


	function PathPoint(oa){
		oa = oa || {};
		this.objtype = 'pathpoint';

		this.P = oa.P? new Coord(oa.P) : new Coord({'x':100, 'y':100});
		this.H1 = oa.H1? new Coord(oa.H1) : new Coord({'x':0, 'y':0});
		this.H2 = oa.H2? new Coord(oa.H2) : new Coord({'x':200, 'y':200});
		this.Q = oa.Q? new Coord(oa.Q) : false;	// Remembering Quadratic single handle for Import SVG
		this.type = oa.type || 'corner';		// corner, flat, symmetric
		// this.parentpath = oa.parentpath || false;

		if(isval(oa.useh1) && oa.useh1) this.useh1 = true;
		else this.useh1 = false;

		if(isval(oa.useh2) && oa.useh2) this.useh2 = true;
		else this.useh2 = false;

		if(this.type === 'symmetric') { this.makeSymmetric('H1'); }
		else if (this.type === 'flat') { this.makeFlat('H1'); }

		//debug('PATHPOINT was passed ' + JSON.stringify(oa));
	}




//-------------------------------------------------------
// PATH POINT METHODS
//-------------------------------------------------------

	PathPoint.prototype.alignY = function(pathPoint) {
		this.P.y = pathPoint.P.y;
	redraw({calledby:'pointDetails'});
	};

	PathPoint.prototype.alignX = function(pathPoint) {
		this.P.x = pathPoint.P.x;
	redraw({calledby:'pointDetails'});
	};

	PathPoint.prototype.alignHV = function(){
		this.H1.x = this.P.x;
		this.H2.x = this.P.x;
		redraw({calledby:'pointDetails'});
	};

	PathPoint.prototype.alignHH = function(){
		var h = [this.H1, this.H2];
		this.H1.y = this.P.y;
		this.H2.y = this.P.y;
		redraw({calledby:'pointDetails'});
	};

  PathPoint.prototype.alignH1X = function (pathPoint) {
	this.H1.x = pathPoint.H1.x;
	redraw({calledby:'pointDetails'});
  };

  PathPoint.prototype.alignH1XCross = function (pathPoint) {
	this.H1.x = pathPoint.H2.x;
	redraw({calledby:'pointDetails'});
  };

  PathPoint.prototype.alignH1Y = function (pathPoint) {
	this.H1.y = pathPoint.H1.y;
	redraw({calledby:'pointDetails'});
  };

  PathPoint.prototype.alignH1YCross = function (pathPoint) {
	this.H1.y = pathPoint.H2.y;
	redraw({calledby:'pointDetails'});
  };

  PathPoint.prototype.alignH2X = function (pathPoint) {
	this.H2.x = pathPoint.H2.x;
	redraw({calledby:'pointDetails'});
  };

  PathPoint.prototype.alignH2XCross = function (pathPoint) {
	this.H2.x = pathPoint.H1.x;
	redraw({calledby:'pointDetails'});
  };

  PathPoint.prototype.alignH2Y = function (pathPoint) {
	this.H2.y = pathPoint.H2.y;
	redraw({calledby:'pointDetails'});
  };

  PathPoint.prototype.alignH2YCross = function (pathPoint) {
	this.H2.y = pathPoint.H1.y;
	redraw({calledby:'pointDetails'});
  };

  PathPoint.prototype.alignHY = function (pathPoint) {
	this.alignH1Y(pathPoint);
	this.alignH2Y(pathPoint);
  };

  PathPoint.prototype.alignHYCross = function (pathPoint) {
	this.alignH1YCross(pathPoint);
	this.alignH2YCross(pathPoint);
  };

	PathPoint.prototype.alignHXCross = function (pathPoint) {
		this.alignH1XCross(pathPoint);
		this.alignH2XCross(pathPoint);
	};

  PathPoint.prototype.alignHX = function (pathPoint) {
		this.alignH1X(pathPoint);
		this.alignH2X(pathPoint);
  };

  PathPoint.prototype.alignH1 = function (pathPoint) {
	this.alignH1X(pathPoint);
	this.alignH1Y(pathPoint);
  };

  PathPoint.prototype.alignH2 = function (pathPoint) {
	this.alignH2X(pathPoint);
	this.alignH2Y(pathPoint);
  };

	PathPoint.prototype.getMutualOffset = function(pathPoint) {
		if(this.P.x === pathPoint.P.x) {
			return Math.abs(this.P.y - pathPoint.P.y);
		}
		else if (this.P.y === pathPoint.P.y) {
			return Math.abs(this.P.x - pathPoint.P.x);
		} else {
			var dX = Math.abs(this.P.x - pathPoint.P.x),
					dY = Math.abs(this.P.y - pathPoint.P.y);
			return Math.sqrt(Math.abs(dX^2 + dY^2));
		}
	};

	PathPoint.prototype.alignMutualOffsetXY = function(p1, p2, p3) {
		this.alignMutualOffsetY(p1, p2, p3);
		this.alignMutualOffsetX(p1, p2, p3);

		redraw({calledby:'pointDetails'});
	};

	PathPoint.prototype.alignMutualOffsetX = function(p1, p2, p3) {
		var dRef = Math.abs(p1.P.x - p2.P.x),
			dCur = Math.abs(this.P.x - (p3.P.x || p2.P.x )),
			delta = dRef - dCur;

				if((this.P.x > p3.P.x) || (this.P.x == p3.P.x)) this.P.x += delta;
				else if(this.P.x < p3.P.x) this.P.x -= delta;
				else if((this.P.x > p2.P.x) || (this.P.x == p2.P.x)) this.P.x += delta;
				else if(this.P.x < p2.P.x)this.P.x -= delta;

		redraw({calledby:'pointDetails'});
	};

	PathPoint.prototype.alignMutualOffsetY = function(p1, p2, p3) {
		var dRef = Math.abs(p1.P.y - p2.P.y),
				dCur = Math.abs(this.P.y - (p3.P.y || p2.P.y )),
				delta = dRef - dCur;

		if((this.P.y > p3.P.y) || (this.P.y == p3.P.y)) this.P.y += delta;
		else if(this.P.y < p3.P.y) this.P.y -= delta;
		else if((this.P.y > p2.P.y) || (this.P.y == p2.P.y)) this.P.y += delta;
		else if(this.P.y < p2.P.y) this.P.y -= delta;

		redraw({calledby:'pointDetails'});
	};

  PathPoint.prototype.alignAngle = function (pathPoint) {

  };

	PathPoint.prototype.setPathPointPosition = function(controlpoint, nx, ny){
		var dx = 0;
		var dy = 0;
		if(nx !== false) nx = parseFloat(nx);
		if(ny !== false) ny = parseFloat(ny);
		var changed = false;

		switch(controlpoint){
			case 'P':
				if(!this.P.xlock && !isNaN(nx)){
					dx = (this.P.x - nx);
					this.P.x = nx;
					this.H1.x -= dx;
					this.H2.x -= dx;
				}
				if(!this.P.ylock && !isNaN(ny)){
					dy = (this.P.y - ny);
					this.P.y = ny;
					this.H1.y -= dy;
					this.H2.y -= dy;
				}
				break;

			case 'H1':
				if(!this.H1.xlock && !isNaN(nx)){
					this.H1.x = nx;
					changed = 'H1';
				}
				if(!this.H1.ylock && !isNaN(ny)){
					this.H1.y = ny;
					changed = 'H1';
				}
				break;

			case 'H2':
				if(!this.H2.xlock && !isNaN(nx)){
					this.H2.x = nx;
					changed = 'H2';
				}
				if(!this.H2.ylock && !isNaN(ny)){
					this.H2.y = ny;
					changed = 'H2';
				}
				break;
		}

		if(changed){
			if(this.type === 'symmetric'){ this.makeSymmetric(changed); }
			else if (this.type === 'flat') { this.makeFlat(changed); }
		}
		
		//this.roundAll();
	};
	
	// returns nudge vector if close enough to grids or guides
	function calculateSnapDelta(x, y, single) {
		var ps = _GP.projectsettings;
		if(!single)	return [0, 0];
		if(!ps.snaptogrid && !ps.snaptoguides) return [0, 0];
		
		// debug(`\n calculateSnapDelta - START`);
		// debug(`\t passed ${x}, ${y}`);
		
		var zoom = getView('calculateSnapDelta').dz;
		var sd = ps.snapdistance;
		var dx = sd + 1; // It won't snap by default!
		var dy = sd + 1; // It won't snap by default!
		
		if(ps.snaptogrid) {
			var grid = round((ps.upm / ps.griddivisions), 3);
			dx = (grid * Math.round(x / grid)) - x;
			dy = (grid * Math.round(y / grid)) - y;
		}
		
		if(ps.snaptoguides) {
			var temp;
			var guide;
			for(var g in ps.guides){if(ps.guides.hasOwnProperty(g)){
				guide = ps.guides[g];
				if(guide.name === 'min' || guide.name === 'max') continue;
				if(guide.type === 'vertical'){
					temp = guide.location - x;
					if(temp * temp <= dx * dx) dx = temp;
				}
				else if(guide.type === 'horizontal'){
					temp = guide.location - y;
					if(temp * temp <= dy * dy) dy = temp;
				}
			}}
		}
		
		// Divide by zoom to get screen pixels instead of em units
		if((dx * dx) > ((sd * sd) / zoom)) dx = 0;
		if((dy * dy) > ((sd * sd) / zoom)) dy = 0;
		
		// debug(`\t returning ${dx} \t ${dy}`);
		
		// debug(` calculateSnapDelta - END\n\n`);
		
		return [dx, dy];
	}
	
	PathPoint.prototype.updatePathPointPosition = function(controlpoint, dx, dy, force, ev, single){
		// debug(`\n PathPoint.updatePathPointPosition - ${controlpoint} - START`);
		// debug(`\t before: ${dx}, ${dy}`);
		
		if(ev && ev.ctrlKey) return;
		
		if(dx !== false) dx = parseFloat(dx);
		if(dy !== false) dy = parseFloat(dy);
		var lockx = (_UI.selectedtool==='pathedit'? this.P.xlock : false);
		var locky = (_UI.selectedtool==='pathedit'? this.P.ylock : false);
		
		if(isval(force)){
			if(force){
				lockx = false;
				locky = false;
			}
		}
		
		var gsnap = [0, 0];
		switch(controlpoint){
			case 'P':
				gsnap = calculateSnapDelta(this.P.x + dx, this.P.y + dy, single);
				dx += gsnap[0];
				dy += gsnap[1];
				// debug(`\t afters: ${dx}, ${dy}`);
				
				if(!lockx) {
					this.P.x += dx;
					this.H1.x += dx
					this.H2.x += dx
				}
				if(!locky) {
					this.P.y += dy;
					this.H1.y += dy
					this.H2.y += dy
				}
				break;
			
			case 'H1' :   
				gsnap = calculateSnapDelta(this.H1.x, this.H1.y, single);
				dx += gsnap[0];
				dy += gsnap[1];
				this.H1.x += dx;
				this.H1.y += dy;
				
				// debug('\t Hold H1, updated to: ' + this.H1.x + ' ' + this.H1.y);
				if(this.type === 'symmetric'){ this.makeSymmetric('H1'); }
				else if (this.type === 'flat') { this.makeFlat('H1'); }
				break;
			
			case 'H2' :
				gsnap = calculateSnapDelta(this.H2.x, this.H2.y, single);
				dx += gsnap[0];
				dy += gsnap[1];
				this.H2.x += dx;
				this.H2.y += dy;

				if(this.type === 'symmetric'){ this.makeSymmetric('H2'); }
				else if (this.type === 'flat') { this.makeFlat('H2'); }
				break;
		}
		
		//this.roundAll();
		dx = round(dx, 6);
		dy = round(dy, 6);
		// debug(`\t returning ${(dx !== 0 || dy !== 0)}`);
		
		// debug(` PathPoint.updatePathPointPosition - END\n\n`);
		
		// return true if the point moved
		return (dx !== 0 || dy !== 0);
	};
		
	PathPoint.prototype.isOverControlPoint = function(x, y, nohandles) {
		var hp = _GP.projectsettings.pointsize/getView('Path.isOverControlPoint').dz;
		
		if( ((this.P.x+hp) > x) && ((this.P.x-hp) < x) && ((this.P.y+hp) > y) && ((this.P.y-hp) < y) ){
			// debug('PathPoint.isOverControlPoint - Returning P1');
			
			return {point:this, type:'P'};
		}
		
		if(this.useh1 && !nohandles){
			if( ((this.H1.x+hp) > x) && ((this.H1.x-hp) < x) && ((this.H1.y+hp) > y) && ((this.H1.y-hp) < y) ){
				// debug('PathPoint.isOverControlPoint - Returning H1');
				return {point:this, type:'H1'};
			}
		}
		
		if(this.useh2 && !nohandles){
			if( ((this.H2.x+hp) > x) && ((this.H2.x-hp) < x) && ((this.H2.y+hp) > y) && ((this.H2.y-hp) < y) ){
				// debug('PathPoint.isOverControlPoint - Returning H2');
				return {point:this, type:'H2'};
			}
		}
		
		return false;
	};
		
	PathPoint.prototype.toggleUseHandle = function(h){
		//debug('TOGGLEUSEHANDLE - before:\n'+json(this));
		
		if(h){
			this.useh1 = !this.useh1;
			history_put('Use Handle 1 : ' + this.useh1);
		} else {
			this.useh2 = !this.useh2;
			history_put('Use Handle 2 : ' + this.useh2);
		}
		_UI.ms.shapes.calcMaxes();
		redraw({calledby:'pointDetails'});
		
		//debug('TOGGLEUSEHANDLE - after:\n'+json(this));
	};
	
	PathPoint.prototype.setPointType = function(type) {
		if(type === 'symmetric') this.makeSymmetric();
		else if (type === 'flat') this.makeFlat();
		else this.type = 'corner';
	};
	
	PathPoint.prototype.makeSymmetric = function(hold){
		//debug('MAKESYMETRIC - hold ' + hold + ' starts as ' + JSON.stringify(this));
		
		if(!hold){
			hold = this.useh1? 'H1' : 'H2';
			if(!(this.useh1 || this.useh2)){
				if( ((this.H2.x+this.P.x+this.H1.x)/3 === this.P.x) && ((this.H2.y+this.P.y+this.H1.y)/3 === this.P.y) ){
					// Handles and points are all in the same place
					this.H2.x-=200;
					this.H1.x+=200;
					this.type = 'symmetric';
					this.useh1 = true;
					this.useh2 = true;
					return;
				}
			}
		}

		switch(hold){
			case 'H1' :
				this.H2.x = ((this.P.x - this.H1.x) + this.P.x);
				this.H2.y = ((this.P.y - this.H1.y) + this.P.y);
				break;
			case 'H2' :
				this.H1.x = ((this.P.x - this.H2.x) + this.P.x);
				this.H1.y = ((this.P.y - this.H2.y) + this.P.y);
				break;
		}

		this.type = 'symmetric';
		this.useh1 = true;
		this.useh2 = true;

		//this.roundAll();
		//debug('MAKESYMETRIC - returns ' + JSON.stringify(this));
	};

	PathPoint.prototype.makeFlat = function(hold){
		// debug('\n PathPoint.makeFlat - START');
		// debug('\t hold passed ' + hold);

		if(this.isFlat()) {
			this.type = 'flat';
			return;
		}

		if(!hold){
			hold = this.useh1? 'H1' : 'H2';
			if(!(this.useh1 || this.useh2)){
				if( ((this.H2.x+this.P.x+this.H1.x)/3 === this.P.x) && ((this.H2.y+this.P.y+this.H1.y)/3 === this.P.y) ){
					// Handles and points are all in the same place
					this.H2.x-=300;
					this.H1.x+=100;
					this.type = 'flat';
					this.useh1 = true;
					this.useh2 = true;
					return;
				}
			}
		}


		var angle1 = this.getH1Angle();
		var angle2 = this.getH2Angle();
		var hyp1 = this.getH1Length();
		var hyp2 = this.getH2Length();

		//new values
		var newHx, newHy, newadj, newopp;

		if(hold === 'H1'){
			//get new x and y for H2
			newadj = Math.cos(angle1) * hyp2;
			newopp = Math.tan(angle1) * newadj;

			//Set values
			newHx =  (this.P.x + (newadj*-1));
			newHy = (this.P.y + (newopp*-1));

			if(!isNaN(newHx) && !isNaN(newHy)){
				this.H2.x = newHx;
				this.H2.y = newHy;
			}

		} else if (hold === 'H2'){
			//get new x and y for H2
			newadj = Math.cos(angle2) * hyp1;
			newopp = Math.tan(angle2) * newadj;

			//Set values
			newHx =  (this.P.x + (newadj*-1));
			newHy = (this.P.y + (newopp*-1));

			if(!isNaN(newHx) && !isNaN(newHy)){
				this.H1.x = newHx;
				this.H1.y = newHy;
			}
		}

		this.type = 'flat';

		// debug(' PathPoint.makeFlat - END\n');
	};

	PathPoint.prototype.isFlat = function() {
		if(this.P.x === this.H1.x && this.P.x === this.H2.x) return true;
		if(this.P.y === this.H1.y && this.P.y === this.H2.y) return true;

		var a1 = this.getH1Angle();
		var a2 = this.getH2Angle();
		// debug('\t comparing ' + a1 + ' / ' + a2);

		 return (round((Math.abs(a1) + Math.abs(a2)), 2) === 3.14);
	};

	PathPoint.prototype.resolvePointType = function(){
		// debug('\n PathPoint.resolvePointType - START');

		if(this.isFlat()){
			if(this.getH1Length() === this.getH2Length()){
				// debug('\t resolvePointType - setting to Symmetric');
				this.type = 'symmetric';
			} else {
				// debug('\t resolvePointType - setting to Flat');
				this.type = 'flat';
			}
		} else {
			// debug('\t resolvePointType - setting to Corner');
			this.type = 'corner';
		}
		// debug(' pathPoint.resolvePointType - END\n');
	};

	PathPoint.prototype.makePointedTo = function(px, py, length, handle, dontresolvetype){
		//figure out angle
		var adj1 = this.P.x-px;
		var opp1 = this.P.y-py;

		var ymod = (opp1 >= 0)? -1 : 1;
		var xmod = -1;

		var hyp1 = Math.sqrt( (adj1*adj1) + (opp1*opp1) );
		var angle1 = Math.acos(adj1 / hyp1);

		length = length || (hyp1/3);
		handle = (handle==='H2')? 'H2' : 'H1';

		//debug('MAKEPOINTEDTO - x/y/l ' + px + ' ' + py + ' ' + length + ' - Before H1x/y ' + this.H1.x + ' ' + this.H1.y);
		this[handle].x = this.P.x + (Math.cos(angle1) * length * xmod);
		this[handle].y = this.P.y + (Math.sin(angle1) * length * ymod);
		//debug('MAKEPOINTEDTO - after H1x/y ' + this.H1.x + ' ' + this.H1.y);
		
		if(!dontresolvetype){
			if(this.type === 'corner') this.makeFlat(handle);
			else this.makeSymmetric(handle);
			//debug('MAKEPOINTEDTO - after makesymmetric H1x/y ' + this.H1.x + ' ' + this.H1.y);
		}
	};

	PathPoint.prototype.round = function(prec) {
		prec = prec || 3;
		this.roundAll(prec);
	};

	PathPoint.prototype.rotate = function(angle, about) {
		// debug('\n PathPoint.rotate - START');
		rotate(this.P, angle, about);
		rotate(this.H1, angle, about);
		rotate(this.H2, angle, about);
		// debug('\t this.P ' + json(this.P, true));
		// debug(' PathPoint.rotate - END\n');
	};

	PathPoint.prototype.resetHandles = function(){
		this.type = 'corner';
		this.useh1 = true;
		this.useh2 = true;
		this.H2.x = this.P.x - 100;
		this.H2.y = this.P.y;
		this.H1.x = this.P.x + 100;
		this.H1.y = this.P.y;
	};

	PathPoint.prototype.getPointNum = function() {
		var parr = this.parentpath;
		if(!parr) return false;

		parr = parr.pathpoints;
		if(!parr) return false;

		for(var p=0; p<parr.length; p++){
			if(parr[p] === this) return p;
		}

		return false;
	};

	PathPoint.prototype.roundAll = function(i){
		this.P.x = round(this.P.x, i || 9);
		this.P.y = round(this.P.y, i || 9);
		this.H1.x = round(this.H1.x, i || 9);
		this.H1.y = round(this.H1.y, i || 9);
		this.H2.x = round(this.H2.x, i || 9);
		this.H2.y = round(this.H2.y, i || 9);
	};



//-------------------------------------------------------
// GETTERS
//-------------------------------------------------------

	PathPoint.prototype.getPx = function() {
		var re = this.P.x;
		if(isNaN(re)){
			re = 0;
			// debug('PathPoint NaN found P.x - falling back to 0');
		}
		return re;
	};

	PathPoint.prototype.getPy = function() {
		var re = this.P.y;
		if(isNaN(re)){
			re = 0;
			// debug('PathPoint NaN found P.y - falling back to 0');
		}
		return re;
	};

	PathPoint.prototype.getH1x = function() {
		this.H1 = this.H1 || new Coord(this.P);
		var re = this.useh1? this.H1.x : this.P.x;
		if(isNaN(re)){
			re = this.P.x || (this.H1.x || 0);
			// debug('PathPoint NaN found H1.x - falling back to ' + re);
		}
		return re;
	};

	PathPoint.prototype.getH1y = function() {
		this.H1 = this.H1 || new Coord(this.P);
		var re = this.useh1? this.H1.y : this.P.y;
		if(isNaN(re)){
			re = this.P.y || (this.H1.y || 0);
			// debug('PathPoint NaN found H1.y - falling back to ' + re);
		}
		return re;
	};

	PathPoint.prototype.getH2x = function() {
		this.H2 = this.H2 || new Coord(this.P);
		var re = this.useh2? this.H2.x : this.P.x;
		if(isNaN(re)){
			re = this.P.x || (this.H2.x || 0);
			// debug('PathPoint NaN found H2.x - falling back to ' + re);
		}
		return re;
	};

	PathPoint.prototype.getH2y = function() {
		this.H2 = this.H2 || new Coord(this.P);
		var re = this.useh2? this.H2.y : this.P.y;
		if(isNaN(re)){
			re = this.P.y || (this.H2.y || 0);
			// debug('PathPoint NaN found H2.y - falling back to ' + re);
		}
		return re;
	};

	PathPoint.prototype.setH1AngleX = function(angle){
		this.H1.x = calculateAngleX(angle, this.H1.y);
	};

	PathPoint.prototype.setH1AngleY = function(angle){
		this.H1.y = calculateAngleY(angle, this.H1.x);
	};

	PathPoint.prototype.setH2AngleX = function(angle){
		this.H2.x = calculateAngleX(angle, this.H2.y);
	};

	PathPoint.prototype.setH2AngleY = function(angle){
		this.H2.y = calculateAngleY(angle, this.H2.x);
	};
	
	PathPoint.prototype.getH1Angle = function(){
		return calculateAngle(this.H1, this.P);
	};

	PathPoint.prototype.getH2Angle = function(){
		return calculateAngle(this.H2, this.P);
	};

	PathPoint.prototype.getH1NiceAngle = function(){
		return calculateNiceAngle(this.getH1Angle());
	};

	PathPoint.prototype.getH2NiceAngle = function(){
		return calculateNiceAngle(this.getH2Angle());
	};

	PathPoint.prototype.getH1Length = function() {
		return calculateLength(this.H1, this.P);
	};

	PathPoint.prototype.getH2Length = function() {
		return calculateLength(this.H2, this.P);
	};




//-------------------------------------------------------
// HELPERS
//-------------------------------------------------------
	function makePathPointFromSegments(seg1, seg2) {
		var newpp = new PathPoint({
			H1: new Coord({x: seg1.p3x, y: seg1.p3y}),
			P: new Coord({x: seg2.p1x, y: seg2.p1y}),
			H2: new Coord({x: seg2.p2x, y: seg2.p2y}),
			useh1: true,
			useh2: true
		});

		if(seg1.line || coordsAreEqual(newpp.H1, newpp.P)) newpp.useh1 = false;
		if(seg2.line || coordsAreEqual(newpp.H2, newpp.P)) newpp.useh2 = false;

		// newpp.resolvePointType();
		

		return newpp;
	}


//-------------------------------------------------------
// DRAW
//-------------------------------------------------------

	PathPoint.prototype.drawPoint = function(accent) {
		// debug('\n PathPoint.drawPoint - START');
		// debug('\t sel = ' + _UI.ms.points.isSelected(this));

		accent = accent || _UI.colors.blue;
		var ps = _GP.projectsettings.pointsize;
		var hp = ps/2;
		// _UI.glypheditctx.fillStyle = sel? 'white' : accent.l65;
		_UI.glypheditctx.fillStyle = _UI.ms.points.isSelected(this)? 'white' : accent.l65;
		_UI.glypheditctx.strokeStyle = accent.l65;
		_UI.glypheditctx.font = '10px Consolas';

		_UI.glypheditctx.fillRect((sx_cx(this.P.x)-hp), (sy_cy(this.P.y)-hp), ps, ps);
		_UI.glypheditctx.strokeRect((sx_cx(this.P.x)-hp), (sy_cy(this.P.y)-hp), ps, ps);

	_UI.glypheditctx.fillStyle = accent.l65;
		_UI.glypheditctx.fillText(this.getPointNum(), sx_cx(this.P.x + 12), sy_cy(this.P.y));
		// debug(' PathPoint.drawPoint - END\n');
	};

	PathPoint.prototype.drawDirectionalityPoint = function(accent, next){
		accent = accent || _UI.colors.blue;
		// _UI.glypheditctx.fillStyle = sel? 'white' : accent.l65;
		_UI.glypheditctx.fillStyle = _UI.ms.points.isSelected(this)? 'white' : accent.l65;
		_UI.glypheditctx.strokeStyle = accent.l65;
		_UI.glypheditctx.lineWidth = 1;
		var begin = {'x':this.P.x, 'y':this.P.y};
		var end = {'x':this.H2.x, 'y':this.H2.y};

		if(!this.useh2) {
			end = {'x':next.P.x, 'y':next.P.y};
		}

		var ps = (_GP.projectsettings.pointsize*0.5);
		var arrow = [
			[(ps*3), 0],
			[ps, ps],
			[-ps, ps],
			[-ps, -ps],
			[ps, -ps]
		];
		var rotatedarrow = [];
		var ang = (Math.atan2((end.y-begin.y),(end.x-begin.x))*-1);

		// FAILURE CASE FALLBACK
		if(!ang && ang !== 0){
			ang = (this.P.x > this.H2.x)? Math.PI : 0;
		}

		for(var a in arrow){ if(arrow.hasOwnProperty(a)){
			rotatedarrow.push([
				((arrow[a][0] * Math.cos(ang)) - (arrow[a][1] * Math.sin(ang))),
				((arrow[a][0] * Math.sin(ang)) + (arrow[a][1] * Math.cos(ang)))
			]);
		}}

		//debug('DRAWPOINT arrow = ' + JSON.stringify(arrow) + '  - rotatedarrow = ' + JSON.stringify(rotatedarrow));

		_UI.glypheditctx.beginPath();
		_UI.glypheditctx.moveTo((rotatedarrow[0][0] + sx_cx(this.P.x)), (rotatedarrow[0][1] + sy_cy(this.P.y)));

		for(var p in rotatedarrow){
			if (p > 0) {
				_UI.glypheditctx.lineTo((rotatedarrow[p][0] + sx_cx(this.P.x)), (rotatedarrow[p][1] + sy_cy(this.P.y)));
			}
		}

		_UI.glypheditctx.lineTo((rotatedarrow[0][0] + sx_cx(this.P.x)), (rotatedarrow[0][1] + sy_cy(this.P.y)));
		_UI.glypheditctx.fill();
		_UI.glypheditctx.stroke();

		// Exact Middle Point
		_UI.glypheditctx.fillStyle = accent.l65;
		_UI.glypheditctx.fillRect((sx_cx(this.P.x).makeCrisp()), (sy_cy(this.P.y).makeCrisp()), 1, 1);
	};

	PathPoint.prototype.drawHandles = function(drawH1, drawH2, accent) {
		var setStyleDefaults = function(){
	  accent = accent || _UI.colors.blue;
	  _UI.glypheditctx.fillStyle = accent.l65;
	  _UI.glypheditctx.strokeStyle = accent.l65;
	  _UI.glypheditctx.lineWidth = 1;
	  _UI.glypheditctx.font = '10px Consolas';
	};
	setStyleDefaults();

		var hp = _GP.projectsettings.pointsize/2;

		if(drawH1 && this.useh1){
			_UI.glypheditctx.beginPath();
			_UI.glypheditctx.arc(sx_cx(this.H1.x), sy_cy(this.H1.y), hp, 0, Math.PI*2, true);
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.fill();

			_UI.glypheditctx.beginPath();
			_UI.glypheditctx.moveTo(sx_cx(this.P.x), sy_cy(this.P.y));
			_UI.glypheditctx.lineTo(sx_cx(this.H1.x), sy_cy(this.H1.y));
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.stroke();
	  _UI.glypheditctx.fillText('1', sx_cx(this.H1.x + 12), sy_cy(this.H1.y));
	}

		if(drawH2 && this.useh2){
			_UI.glypheditctx.beginPath();
			_UI.glypheditctx.arc(sx_cx(this.H2.x), sy_cy(this.H2.y), hp, 0, Math.PI*2, true);
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.fill();

			_UI.glypheditctx.beginPath();
			_UI.glypheditctx.moveTo(sx_cx(this.P.x), sy_cy(this.P.y));
			_UI.glypheditctx.lineTo(sx_cx(this.H2.x), sy_cy(this.H2.y));
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.stroke();
	  _UI.glypheditctx.fillText('2', sx_cx(this.H2.x + 12), sy_cy(this.H2.y));
	}
	};

	PathPoint.prototype.drawQuadraticHandle = function(prevP) {
		// Draw Quadratic handle point from imported SVG
		_UI.glypheditctx.fillStyle = _UI.colors.error.medium;
		_UI.glypheditctx.strokeStyle = _UI.colors.error.medium;
		_UI.glypheditctx.lineWidth = 1;
		var hp = _GP.projectsettings.pointsize/2;

		if(this.Q){
			_UI.glypheditctx.beginPath();
			_UI.glypheditctx.arc(sx_cx(this.Q.x), sy_cy(this.Q.y), hp, 0, Math.PI*2, true);
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.fill();

			_UI.glypheditctx.beginPath();
			_UI.glypheditctx.moveTo(sx_cx(this.P.x), sy_cy(this.P.y));
			_UI.glypheditctx.lineTo(sx_cx(this.Q.x), sy_cy(this.Q.y));
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.stroke();

			if(prevP){
				_UI.glypheditctx.beginPath();
				_UI.glypheditctx.moveTo(sx_cx(prevP.x), sy_cy(prevP.y));
				_UI.glypheditctx.lineTo(sx_cx(this.Q.x), sy_cy(this.Q.y));
				_UI.glypheditctx.closePath();
				_UI.glypheditctx.stroke();
			}
		}
	};


//-------------------------------------------------------
// COORDINATE OBJECT
//-------------------------------------------------------

	function Coord(oa){
		this.objtype = 'coord';
		oa = oa || {};

		this.x = parseFloat(oa.x) || 0;
		this.y = parseFloat(oa.y) || 0;
		this.xlock = oa.xlock || false;
		this.ylock = oa.ylock || false;

		if(oa && oa.x !== undefined && isNaN(oa.x)) console.warn('NEW COORD >> initialized oa.x = ' + oa.x);
		if(oa && oa.y !== undefined && isNaN(oa.y)) console.warn('NEW COORD >> initialized oa.y = ' + oa.y);
	}

	function coordsAreEqual(c1, c2, threshold) {
		// debug('\n coordsAreEqual - START');
		threshold = threshold || 1;
		// debug('\t c1 ' + json(c1, true));
		// debug('\t c2 ' + json(c2, true));
		// debug('\t threshold ' + threshold);

		if(c1.x === c2.x && c1.y === c2.y){
			// debug('\t exact match');
			return true;
		}

		var dx = Math.abs(c1.x - c2.x);
		var dy = Math.abs(c1.y - c2.y);

		// debug('\t dx ' + dx + '\tdy ' + dy);

		if(dx <= threshold && dy <= threshold){
			// debug('\t below threshold match');
			return true;
		}

		// debug('\t not a match');
		// debug(' coordsAreEqual - END\n');

		return false;
	}

// end of file// start of file
/**
	Object > Segment
	A Segment stores and acts on a piece of a Path
	according to the mathmatical definition of a
	Bezier curve.

	Paths in Glyphr Studio are a collection of
	Path Points, which themselves contain a point
	and two handles.  Bezier curves, on the other
	hand, are represented as two points, with two
	handles between them.

	This Segment object is basically here just to
	make Bezier math easier for Paths.
**/

	function Segment(oa){
		// debug('\n SEGMENT - START');
		oa = oa || {};
		this.objtype = 'segment';

		this.p1x = numSan(oa.p1x) || 0;
		this.p1y = numSan(oa.p1y) || 0;

		this.p2x = numSan(oa.p2x) || this.p1x || 0;
		this.p2y = numSan(oa.p2y) || this.p1y || 0;

		this.p3x = numSan(oa.p3x) || 0;
		this.p3y = numSan(oa.p3y) || 0;

		this.p4x = numSan(oa.p4x) || 0;
		this.p4y = numSan(oa.p4y) || 0;

		if(!oa.p3x) this.p3x = this.p4x;
		if(!oa.p3y) this.p3y = this.p4y;

		this.line = this.isLine();

		// cache
		oa.cache = oa.cache || {};
		this.cache = {};
		this.cache.length = oa.cache.length || false;

		// debug(' SEGMENT - END\n');
	}



//	-----------------------------------
//	Methods
//	-----------------------------------
	Segment.prototype.changed = function() { 
		this.cache = {};
		this.line = this.isLine();
	};


//	-----------------------------------
//	Drawing
//	-----------------------------------

	Segment.prototype.drawSegmentOutline = function(color, dx, dy) {
		if(!_UI.glypheditctx) setupEditCanvas();
		var ctx = _UI.glypheditctx;
		
		ctx.strokeStyle = RGBAtoRGB((color || _UI.colors.green.l65), 0.9);
		dx = dx || 0;
		dy = dy || 0;
		var p1x = sx_cx(this.p1x + dx);
		var p1y = sy_cy(this.p1y + dy);
		var p2x = sx_cx(this.p2x + dx);
		var p2y = sy_cy(this.p2y + dy);
		var p3x = sx_cx(this.p3x + dx);
		var p3y = sy_cy(this.p3y + dy);
		var p4x = sx_cx(this.p4x + dx);
		var p4y = sy_cy(this.p4y + dy);

		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(p1x, p1y);
		ctx.bezierCurveTo(p2x, p2y, p3x, p3y, p4x, p4y);
		ctx.stroke();
		ctx.closePath();
	};

	Segment.prototype.drawSegmentPoints = function(color, txt) {
		if(!_UI.glypheditctx) setupEditCanvas();		
		var ctx = _UI.glypheditctx;
		
		txt = isval(txt)? txt : '•';
		var p1x = sx_cx(this.p1x);
		var p1y = sy_cy(this.p1y);
		var p2x = sx_cx(this.p2x);
		var p2y = sy_cy(this.p2y);
		var p3x = sx_cx(this.p3x);
		var p3y = sy_cy(this.p3y);
		var p4x = sx_cx(this.p4x);
		var p4y = sy_cy(this.p4y);

		color = RGBAtoRGB((color || _UI.colors.green.l65), 0.4);
		
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.font = '48px sans-serif';

		ctx.fillText(txt, p1x, p1y);
		// ctx.fillText(txt, p2x, p2y);
		// ctx.fillText(txt, p3x, p3y);
		// ctx.fillText(txt, p4x, p4y);

		ctx.fillRect(p1x, p1y, 5, 5);
		ctx.strokeRect(p2x, p2y, 5, 5);
		ctx.strokeRect(p3x, p3y, 5, 5);
		ctx.fillRect(p4x, p4y, 5, 5);

		// else draw_CircleHandle({'x':sx_cx(this.p4x), 'y':sy_cy(this.p4y)});
	};



//	-----------------------------------
//	Splitting
//	-----------------------------------
	Segment.prototype.split = function(sp) {

		sp = sp || 0.5;

		if(typeof sp === 'object' && isval(sp.x) && isval(sp.y)){
			return this.splitAtCoord(sp);

		} else if (!isNaN(sp)) {
			return this.splitAtTime(sp);

		}

		return false;
	};

	Segment.prototype.splitAtCoord = function(co) {
		// debug('\n Segment.splitAtCoord - START');
		// debug('\t splitting at ' + json(co, true));

		if(this.containsTerminalPoint(co, 0.1)) return false;

		if(this.line && this.line !== 'diagonal'){
			var newx, newy;
			var online = false;

			if(this.line === 'horizontal'){
				if(round(co.y, 2) === round(this.p1y, 2)){
					if((co.x > Math.min(this.p1x, this.p4x)) && (co.x < Math.max(this.p1x, this.p4x))){
						newx = co.x;
						newy = this.p1y;
						online = true;
					}
				}

			} else if (this.line === 'vertical'){
				if(round(co.x, 2) === round(this.p1x, 2)){
					if((co.y > Math.min(this.p1y, this.p4y)) && (co.y < Math.max(this.p1y, this.p4y))){
						newx = this.p1x;
						newy = co.y;
						online = true;
					}
				}
			}

			if(!online){
				// debug('\t not on the line');
				// debug(' Segment.splitAtCoord - END\n');
				return false;
			}

			// debug('\t returning simple line split');
			// debug(' Segment.splitAtCoord - END\n');
			return [
				new Segment({
					'p1x' : this.p1x,
					'p1y' : this.p1y,
					'p4x' : newx,
					'p4y' : newy
				}),
				new Segment({
					'p1x' : newx,
					'p1y' : newy,
					'p4x' : this.p4x,
					'p4y' : this.p4y
				})
			];

		} else if (this.pointIsWithinMaxes(co)){
			var threshold = 0.1;

			var sp = this.getSplitFromCoord(co, threshold);

			// debug('\t distance is ' + sp.distance);

			if(sp && sp.distance < threshold){
			// debug('\t splitting at ' + sp.split);
				// if(this.line === 'diagonal'){
				// 	// debug('\t splitting diagonal');
				// 	var re = this.splitAtTime(sp.split);
				// 	re[0] = re[0].convertToLine();
				// 	re[1] = re[1].convertToLine();
				// 	return re;
				// } else {
					return this.splitAtTime(sp.split);
				// }

			}
		}

		// debug(' Segment.splitAtCoord - returning false - END\n');
		return false;
	};

	Segment.prototype.splitAtTime = function(t) {
		// debug('\n Segment.splitAtTime - START');
		var fs = t || 0.5;
		var rs = (1-fs);

		// Do some math
		var x12 = (this.p1x * rs) + (this.p2x * fs);
		var y12 = (this.p1y * rs) + (this.p2y * fs);

		var x23 = (this.p2x * rs) + (this.p3x * fs);
		var y23 = (this.p2y * rs) + (this.p3y * fs);

		var x34 = (this.p3x * rs) + (this.p4x * fs);
		var y34 = (this.p3y * rs) + (this.p4y * fs);

		var x123 = (x12 * rs) + (x23 * fs);
		var y123 = (y12 * rs) + (y23 * fs);

		var x234 = (x23 * rs) + (x34 * fs);
		var y234 = (y23 * rs) + (y34 * fs);

		var x1234 = (x123 * rs) + (x234 * fs);
		var y1234 = (y123 * rs) + (y234 * fs);

		// Return two new Segments
		return [
			new Segment({
				'p1x' : this.p1x,
				'p1y' : this.p1y,
				'p2x' : x12,
				'p2y' : y12,
				'p3x' : x123,
				'p3y' : y123,
				'p4x' : x1234,
				'p4y' : y1234
			}),
			new Segment({
				'p1x' : x1234,
				'p1y' : y1234,
				'p2x' : x234,
				'p2y' : y234,
				'p3x' : x34,
				'p3y' : y34,
				'p4x' : this.p4x,
				'p4y' : this.p4y
			})
		];
	};

	Segment.prototype.splitSegmentAtProvidedCoords = function(coords, threshold) {
		// debug('\n Segment.splitSegmentAtProvidedCoords - START');

		var segs = [new Segment(clone(this))];
		var tr;

		for(var x=0; x<coords.length; x++){
			for(var s=0; s<segs.length; s++){
				if(!segs[s].containsTerminalPoint(coords[x], threshold)){
					tr = segs[s].splitAtCoord(coords[x]);
					if(tr){
						segs.splice(s, 1, tr[0], tr[1]);
						// s++;
						// break;
					}					
				}
			}
		}

		// debug('\t split into ' + segs.length);
		// debug(' Segment.splitSegmentAtProvidedCoords - END\n');

		return segs;
	};

	Segment.prototype.pointIsWithinMaxes = function(co) {
		var m = this.getMaxes();

		var re = (co.x <= m.xmax &&
			co.x >= m.xmin &&
			co.y <= m.ymax &&
			co.y >= m.ymin );

		return re;
	};

	Segment.prototype.convertToLine = function() {
		return new Segment({p1x: this.p1x, p1y: this.p1y, p4x: this.p4x, p4y: this.p4y});
	};


//	-----------------------------------
//	Getters
//	-----------------------------------
	Segment.prototype.getSplitFromCoord = function(coord, threshold) {
		var grains = this.getQuickLength() * 1000;
		var mindistance = 999999999;
		var re = false;
		var check, d;

		for(var t=0; t<1; t+=(1/grains)){
			check = this.getCoordFromSplit(t);
			d = Math.sqrt( ((check.x-coord.x)*(check.x-coord.x)) + ((check.y-coord.y)*(check.y-coord.y)) );
			if(d < mindistance){
				mindistance = d;
				re = {
					'split' : t,
					'distance' : d,
					'x' : check.x,
					'y' : check.y
				};

				if(threshold && re.distance < threshold) return re;
			}
		}

		return re;
	};

	Segment.prototype.getLength = function() {
		// this function is only used as an approximation
		// threshold in em units

		if(this.cache && this.cache.length) return this.cache.length;

		var re;
		var threshold = 10;
		var a = Math.abs(this.p1x - this.p4x);
		var b = Math.abs(this.p1y - this.p4y);
		var c = Math.sqrt((a*a) + (b*b));

		if(this.line || c < threshold) {
			this.cache.length = c;
			return c;

		} else {
			var s = this.split();
			re = s[0].getLength() + s[1].getLength();
			this.cache.length = re;
			return re;
		}
	};

	Segment.prototype.getQuickLength = function() {
		var a = Math.abs(this.p1x - this.p4x);
		var b = Math.abs(this.p1y - this.p4y);
		var c = Math.sqrt((a*a) + (b*b));

		return c;
	};

	Segment.prototype.getCoordFromSplit = function(t) {
		t = t || 0.5;
		var rs = (1-t);

		// Do some math
		var x12 = (this.p1x * rs) + (this.p2x * t);
		var y12 = (this.p1y * rs) + (this.p2y * t);

		var x23 = (this.p2x * rs) + (this.p3x * t);
		var y23 = (this.p2y * rs) + (this.p3y * t);

		var x34 = (this.p3x * rs) + (this.p4x * t);
		var y34 = (this.p3y * rs) + (this.p4y * t);

		var x123 = (x12 * rs) + (x23 * t);
		var y123 = (y12 * rs) + (y23 * t);

		var x234 = (x23 * rs) + (x34 * t);
		var y234 = (y23 * rs) + (y34 * t);

		var x1234 = (x123 * rs) + (x234 * t);
		var y1234 = (y123 * rs) + (y234 * t);

		return {'x':x1234, 'y':y1234};
	};

	Segment.prototype.getReverse = function() {
		return new Segment({
			'p1x': this.p4x,
			'p1y': this.p4y,
			'p2x': this.p3x,
			'p2y': this.p3y,
			'p3x': this.p2x,
			'p3y': this.p2y,
			'p4x': this.p1x,
			'p4y': this.p1y
		});
	};

	Segment.prototype.getCoord = function(pt) {
		if(pt === 1) return {x:this.p1x, y:this.p1y};
		else if(pt === 2) return {x:this.p2x, y:this.p2y};
		else if(pt === 3) return {x:this.p3x, y:this.p3y};
		else if(pt === 4) return {x:this.p4x, y:this.p4y};
	};



//	-----------------------------------
//	Bounds
//	-----------------------------------

	Segment.prototype.getFastMaxes = function() {
		var bounds = {
			'xmin' : Math.min(this.p1x, Math.min(this.p2x, Math.min(this.p3x, this.p4x))),
			'ymin' : Math.min(this.p1y, Math.min(this.p2y, Math.min(this.p3y, this.p4y))),
			'xmax' : Math.max(this.p1x, Math.max(this.p2x, Math.max(this.p3x, this.p4x))),
			'ymax' : Math.max(this.p1y, Math.max(this.p2y, Math.max(this.p3y, this.p4y)))
		};

		return bounds;
	};

	Segment.prototype.getMaxes = function() {
		// debug('\n Segment.getMaxes - START');
		// debug(this);

		var bounds = {
			'xmin' : Math.min(this.p1x, this.p4x),
			'ymin' : Math.min(this.p1y, this.p4y),
			'xmax' : Math.max(this.p1x, this.p4x),
			'ymax' : Math.max(this.p1y, this.p4y)
		};

		if(this.line){
			// debug([bounds]);
			// debug(' Segment.getMaxes - returning fastmaxes for line - END\n');
			return bounds;
		}

		var d1x = this.p2x - this.p1x;
		var d1y = this.p2y - this.p1y;
		var d2x = this.p3x - this.p2x;
		var d2y = this.p3y - this.p2y;
		var d3x = this.p4x - this.p3x;
		var d3y = this.p4y - this.p3y;

		var numerator, denominator, quadroot, root, t1, t2;

		if(this.p2x<bounds.xmin || this.p2x>bounds.xmax || this.p3x<bounds.xmin || this.p3x>bounds.xmax) {
			// X bounds
			if(d1x+d3x !== 2*d2x) { d2x+=0.01; }
			numerator = 2*(d1x - d2x);
			denominator = 2*(d1x - 2*d2x + d3x);
			quadroot = (2*d2x-2*d1x)*(2*d2x-2*d1x) - 2*d1x*denominator;
			root = Math.sqrt(quadroot);
			t1 =  (numerator + root) / denominator;
			t2 =  (numerator - root) / denominator;
			if(0<t1 && t1<1) { checkXbounds(bounds, getBezierValue(t1, this.p1x, this.p2x, this.p3x, this.p4x)); }
			if(0<t2 && t2<1) { checkXbounds(bounds, getBezierValue(t2, this.p1x, this.p2x, this.p3x, this.p4x)); }
		}

		// Y bounds
		if(this.p2y<bounds.ymin || this.p2y>bounds.ymax || this.p3y<bounds.ymin || this.p3y>bounds.ymax) {
			if(d1y+d3y !== 2*d2y) { d2y+=0.01; }
			numerator = 2*(d1y - d2y);
			denominator = 2*(d1y - 2*d2y + d3y);
			quadroot = (2*d2y-2*d1y)*(2*d2y-2*d1y) - 2*d1y*denominator;
			root = Math.sqrt(quadroot);
			t1 =  (numerator + root) / denominator;
			t2 =  (numerator - root) / denominator;
			if(0<t1 && t1<1) { checkYbounds(bounds, getBezierValue(t1, this.p1y, this.p2y, this.p3y, this.p4y)); }
			if(0<t2 && t2<1) { checkYbounds(bounds, getBezierValue(t2, this.p1y, this.p2y, this.p3y, this.p4y)); }
		}

		// debug([this.getFastMaxes(), bounds]);
		// debug(' Segment.getMaxes - END\n');
		return bounds;
	};

	function checkXbounds(bounds, value) {
		if(bounds.xmin > value) { bounds.xmin = value; }
		else if(bounds.xmax < value) { bounds.xmax = value; }
	}

	function checkYbounds(bounds, value) {
		if(bounds.ymin > value) { bounds.ymin = value; }
		else if(bounds.ymax < value) { bounds.ymax = value; }
	}

	function getBezierValue(t, p0, p1, p2, p3) {
		var mt = (1-t);
		return (mt*mt*mt*p0) + (3*mt*mt*t*p1) + (3*mt*t*t*p2) + (t*t*t*p3);
	}



//	-----------------------------------
//	Curve Intersections
//	-----------------------------------

	function findSegmentIntersections(s1, s2, depth) {
		// debug('\n findSegmentIntersections - START');
		depth = depth || 0;
		// debug('\t depth ' + depth);


		// if(depth > 15) {
			// debug('\t fINDsEGMENTiNTERSECTIONS debug early return');
		// 	return [];
		// }
		// s1.drawSegmentOutline();
		// s2.drawSegmentOutline();


		// Check for overlapping / coincident segments
		if(depth === 0){
			var co = findOverlappingLineSegmentIntersections(s1, s2);
			if(co.length){
				// debug('\t found overlapping line ' + co[0]);
			 	return co;
			}
		}

		// If both segments are lines, check for intersection
		if(depth === 0){
			var cr = findCrossingLineSegmentIntersections(s1, s2);
			if(cr.length){
				// debug('\t found cross line ' + cr[0]);
				return cr;
			}
		}

		// Edge case, find end points overlapping the other segment
		var endpoints = [];
		if(depth===0 && (s1.line || s2.line)){
			// findEndPointSegmentIntersections is a perf hit
			// only run if either s1 or s2 is a line segment
			endpoints = findEndPointSegmentIntersections(s1, s2);
		}

		// Check to stop recursion
		var s1m = s1.getFastMaxes();
		var s2m = s2.getFastMaxes();

		if(!maxesOverlap(s1m, s2m)){
			// debug('\t segments have non overlapping fastmaxes');
			return [];
		}
		// debug('\t segments fastmaxes overlap');
		// debug([s1m]);
		// debug([s2m]);

		// Complex segment intersections
		var threshold = 0.00005;
		var precision = 3;

		var s1w = (s1m.xmax - s1m.xmin);
		var s1h = (s1m.ymax - s1m.ymin);
		var s2w = (s2m.xmax - s2m.xmin);
		var s2h = (s2m.ymax - s2m.ymin);
		// debug('\t s1 w/h: ' + s1w + ' / ' + s1h);
		// debug('\t s2 w/h: ' + s2w + ' / ' + s2h);

		if( (s1w < threshold) &&
			(s1h < threshold) &&
			(s2w < threshold) &&
			(s2h < threshold) ){
				s1w *= 0.5;
				s1h *= 0.5;
				s2w *= 0.5;
				s2h *= 0.5;
				var x = ((s1m.xmin + s1w) + (s2m.xmin + s2w)) / 2;
				var y = ((s1m.ymin + s1h) + (s2m.ymin + s2h)) / 2;

				x = round(x, precision);
				y = round(y, precision);

				var ix = ''+x+'/'+y;
				// debug('\t <<<<<<<<<<<<<<<<< hit bottom, found ' + ix);
				return [ix];
		} else {
			// debug('\t not below threshold at ' + depth);
		}

		// More recursion needed
		var re = [];
		var s1split = s1.splitAtTime(0.5);
		var s2split = s2.splitAtTime(0.5);
		var pairs = [
			[s1split[0], s2split[0]],
			[s1split[0], s2split[1]],
			[s1split[1], s2split[1]],
			[s1split[1], s2split[0]],
		];

		pairs = pairs.filter(function(p) {
			return maxesOverlap(p[0].getFastMaxes(), p[1].getFastMaxes(), 'inclusive');
		});

		// debug('\t ' + pairs.length + ' pairs after maxes overlap filter');
		// debug(pairs);

		pairs.forEach(function(p) {
			re = re.concat( findSegmentIntersections(p[0], p[1], depth+1) );
		});

		re = re.concat(endpoints);
		re = re.filter(duplicates);

		// if(depth === 0) alert('break');

		// debug('\t return length ' + re.length);
		// debug(' findSegmentIntersections - END\n');
		return re;
	}

	function findOverlappingLineSegmentIntersections(s1, s2) {

		// Check if the two segments are overlapping horizontal or vertical lines
		// If so, just return one point from the coincident lines
		var re = [];

		if(s1.containsPointOnLine(s2.getCoord(1))) re.push(''+s2.p1x+'/'+s2.p1y);
		if(s1.containsPointOnLine(s2.getCoord(4))) re.push(''+s2.p4x+'/'+s2.p4y);

		if(s2.containsPointOnLine(s1.getCoord(1))) re.push(''+s1.p1x+'/'+s1.p1y);
		if(s2.containsPointOnLine(s1.getCoord(4))) re.push(''+s1.p4x+'/'+s1.p4y);

		if(re.length){
			// debug('\n findOverlappingLineSegmentIntersections - START');
			// debug([s1, s2]);
			// debug(json(re));
			// debug(' findOverlappingLineSegmentIntersections - END\n');
		}

		return re;
	}

	function findCrossingLineSegmentIntersections(s1, s2) {
		// debug('\n findCrossingLineSegmentIntersections - START');
		if(!s1.line || !s2.line) return [];

		var d1x = s1.p4x - s1.p1x;
		var d1y = s1.p4y - s1.p1y;
		var d2x = s2.p4x - s2.p1x;
		var d2y = s2.p4y - s2.p1y;

		var s = ((-1*d1y) * (s1.p1x - s2.p1x) + d1x * (s1.p1y - s2.p1y)) / ((-1*d2x) * d1y + d1x * d2y);
		var t = ( d2x * (s1.p1y - s2.p1y) - d2y * (s1.p1x - s2.p1x)) / ((-1*d2x) * d1y + d1x * d2y);

		if (s >= 0 && s <= 1 && t >= 0 && t <= 1){
			var rx = numSan(s1.p1x + (t * d1x));
			var ry = numSan(s1.p1y + (t * d1y));

			// debug('\t found ' + rx + ', ' + ry);
			if(s1.containsTerminalPoint({x:rx, y:ry}) && s2.containsTerminalPoint({x:rx, y:ry})){
				// debug('\t its an end point');
				// debug(' findCrossingLineSegmentIntersections - END\n');
				return [];
			}


			var re = [(''+rx+'/'+ry)];
			// debug(' findCrossingLineSegmentIntersections - END\n');
			return re;
		}

		// debug(' findCrossingLineSegmentIntersections - END\n');
		return [];
	}

	function findEndPointSegmentIntersections(s1, s2) {
		// debug('\n findEndPointSegmentIntersections - START');
		var s1s = s1.getCoord(1);
		var s1e = s1.getCoord(4);
		var s2s = s2.getCoord(1);
		var s2e = s2.getCoord(4);

		var re = [];

		if(s1.containsPointOnCurve(s2s)) re.push(coordToIx(s2s));
		if(s1.containsPointOnCurve(s2e)) re.push(coordToIx(s2e));
		if(s2.containsPointOnCurve(s1s)) re.push(coordToIx(s1s));
		if(s2.containsPointOnCurve(s1e)) re.push(coordToIx(s1e));

		// debug('\t returning ' + re);
		// debug(' findEndPointSegmentIntersections - END\n');
		return re;
	}

	function ixToCoord(ix) {
		// debug('\n ixToCoord - START');
		// debug(ix);
		var re = {
			x: parseFloat(ix.split('/')[0]),
			y: parseFloat(ix.split('/')[1])
		};
		// debug([re]);
		// debug(' ixToCoord - END\n');
		return re;
	}

	function coordToIx(co) {
		return (''+co.x+'/'+co.y);
	}



//	-----------------------------------
//	Curve Checking
//	-----------------------------------

	Segment.prototype.isRedundantTo = function(s) {
		// A segment is  Redundant redundant to another segment if
		// it is completely overlapped by the other segment

		if(!this.line) return false;

		return (s.containsPointOnLine(this.getCoord(1)) && s.containsPointOnLine(this.getCoord(4)));
	};

	function segmentsAreEqual(s1, s2, threshold) {
		// debug('\n segmentsAreEqual - START');
		threshold = threshold || 1;
		// debug([s1, s2]);

		if( coordsAreEqual(s1.getCoord(1), s2.getCoord(1), threshold) &&
			coordsAreEqual(s1.getCoord(4), s2.getCoord(4), threshold) ){

			if(s1.line && s2.line){
				// debug(' segmentsAreEqual - returning LINE true - END\n');
				return true;

			} else if ( coordsAreEqual(s1.getCoord(2), s2.getCoord(2), threshold) &&
						coordsAreEqual(s1.getCoord(3), s2.getCoord(3), threshold) ) {
				// debug(' segmentsAreEqual - returning FULLY true - END\n');
				return true;
			}
		}

		// debug(' segmentsAreEqual - returning false - END\n');
		return false;
	}

	Segment.prototype.containsTerminalPoint = function(pt, threshold) {
		threshold = threshold || 1;
		if(this.containsStartPoint(pt, threshold)) return 'start';
		else if(this.containsEndPoint(pt, threshold)) return 'end';
		else return false;
	};

	Segment.prototype.containsStartPoint = function(pt, threshold) {
		threshold = threshold || 1;
		return coordsAreEqual(this.getCoord(1), pt, threshold);
	};

	Segment.prototype.containsEndPoint = function(pt, threshold) {
		threshold = threshold || 1;
		return coordsAreEqual(this.getCoord(4), pt, threshold);
	};

	Segment.prototype.containsPointOnCurve = function(pt, threshold) {
		if(this.containsTerminalPoint(pt, threshold)) return true;

		if(this.line) return this.containsPointOnLine(pt);

		threshold = isval(threshold)? threshold : 0.1;
		var t = this.getSplitFromCoord(pt, threshold);

		if(t && t.distance < threshold) return true;
		else return false;
	};

	Segment.prototype.containsPointOnLine = function(pt) {
		// debug('\n Segment.containsPointOnLine - START');
		// debug('\t checking ' + pt.x + ' \t' + pt.y);

		if(!this.line){
			// debug('\t this is not a line, returning false');
			return false;
		}

		if(this.containsTerminalPoint(pt)){
			// debug('\t this segment contains the point as an end point, returning false');
			return false;
		}

		function within(l, m, r){ return ((l <= m) && (m <= r)) || ((r <= m) && (m <= l)); }

		if( within(this.p1x, pt.x, this.p4x) &&
			within(this.p1y, pt.y, this.p4y) &&
			pointsAreCollinear(this.getCoord(1), this.getCoord(4), pt) ){
			// debug('\t returning true');
			return true;
		}

		// debug('\t fallthrough returning false');
		return false;
	};

	function pointsAreCollinear(a, b, c, precision){
		precision = isval(precision)? precision : 3;

		var s1 =  (b.x - a.x) * (c.y - a.y);
		var s2 =  (c.x - a.x) * (b.y - a.y);

		return round(s1, precision) === round(s2, precision);
	}

	Segment.prototype.preceeds = function(s2, threshold) {
		threshold = threshold || 1;
		return (coordsAreEqual(this.getCoord(4)), s2.getCoord(1), threshold);
	};

	Segment.prototype.isLine = function(precision) {
		precision = isval(precision)? precision : 1;

		var rex = ( round(this.p1x, precision) === round(this.p2x, precision) &&
					round(this.p1x, precision) === round(this.p3x, precision) &&
					round(this.p1x, precision) === round(this.p4x, precision) );
		if(rex) return 'vertical';


		var rey = ( round(this.p1y, precision) === round(this.p2y, precision) &&
					round(this.p1y, precision) === round(this.p3y, precision) &&
					round(this.p1y, precision) === round(this.p4y, precision) );
		if(rey) return 'horizontal';


		var red = ( pointsAreCollinear(this.getCoord(1), this.getCoord(4), this.getCoord(2)) &&
					pointsAreCollinear(this.getCoord(1), this.getCoord(4), this.getCoord(3)) );
		if(red) return 'diagonal';

		return false;
	};

	Segment.prototype.toString = function(precision) {
		precision = isval(precision)? precision : 1;
		re = '';

		re += round(this.p1x, precision) + '\t' + round(this.p1y, precision) + '\n';
		// re += round(this.p2x, precision) + '\t' + round(this.p2y, precision) + '\n';
		// re += round(this.p3x, precision) + '\t' + round(this.p3y, precision) + '\n';
		re += round(this.p4x, precision) + '\t' + round(this.p4y, precision) + '\n';

		return re;
	};

	Segment.prototype.round = function(precision) {
		precision = isval(precision)? precision : 3;

		this.p1x = round(this.p1x, precision);
		this.p1y = round(this.p1y, precision);
		this.p2x = round(this.p2x, precision);
		this.p2y = round(this.p2y, precision);
		this.p3x = round(this.p3x, precision);
		this.p3y = round(this.p3y, precision);
		this.p4x = round(this.p4x, precision);
		this.p4y = round(this.p4y, precision);
	};

// end of file // start of file
/**
	Horizontal Kern
	An object for storing two groups of glyphs, and 
	the kern value that applies to them.
**/


	function HKern (oa) {
		this.objtype = 'hkern';

		this.leftgroup = oa.leftgroup || [];
		this.rightgroup = oa.rightgroup || [];

		// Positive values reduce space between chars
		this.value = oa.value || 0;
	}

	HKern.prototype.getName = function() {
		var left = hexToChars(this.leftgroup.join(''));
		var right = hexToChars(this.rightgroup.join(''));
		return '' + left + ' | ' + right;
	};

	function getSelectedKern() {
		var re = _GP.kerning[_UI.selectedkern];
		return re || _GP.kerning[getFirstID(_GP.kerning)] || false;
	}

	function getSelectedKernID() {
		_UI.selectedkern = _UI.selectedkern || getFirstID(_GP.kerning);
		return _UI.selectedkern;
	}

// end of file// start of file
/**
	Object > Poly Segment
	A Poly Segment (aka poly bezier) stores a
	series of Segments that	represent a Path.

	Paths in Glyphr Studio are a collection of
	Path Points, which themselves contain a point
	and two handles.  Bezier curves, on the other
	hand, are represented as two points, with two
	handles between them.

	This PolySegment object is basically here just
	to make Bezier math easier for Paths.
**/

	function PolySegment(oa){
		// debug('\n SEGMENT - START');
		oa = oa || {};
		this.objtype = 'polysegment';

		this.segments = [];
		oa.segments = oa.segments || [];

		for(var i=0; i<oa.segments.length; i++){
			this.segments[i] = new Segment(oa.segments[i]);
		}

		// debug(' SEGMENT - END\n');
	}



//	-----------------------------------
//	Methods
//	-----------------------------------
	PolySegment.prototype.drawPolySegmentOutline = function(dx, dy) {
		var c;
		for(var s=0; s<this.segments.length; s++){
			c = makeRandomSaturatedColor();
			this.segments[s].drawSegmentOutline(c, dx, dy);
		}
	};

	PolySegment.prototype.drawPolySegmentPoints = function() {
		this.segments.forEach(function(v, i) {
			v.drawSegmentPoints(false, i);
		});
	};

	PolySegment.prototype.slowlyDrawSegments = function() {
		// debug('\n PolySegment.slowlyDrawSegments - START');
		// debug(this.segments);

		currseg = 0;

		function ds() {
			if(currseg < this.segments.length){
				this.segments[currseg].drawSegmentOutline();
				this.segments[currseg].drawSegmentPoints('red', currseg);
				currseg++;
				setTimeout(ds, 600);
			} else {
				// debug(' PolySegment.slowlyDrawSegments - END\n');
			}
		}

		setTimeout(ds, 500);
	};

	PolySegment.prototype.getPath = function() {
		// debug('\n PolySegment.getPath - START');
		// debug(this.segments);

		var pp = [];

		pp.push(makePathPointFromSegments(this.segments[this.segments.length-1], this.segments[0]));
		var ns;
		for(var s=0; s<this.segments.length-1; s++){
			ns = this.segments[s+1];
			pp.push(makePathPointFromSegments(this.segments[s], ns));
		}

		// debug(pp);
		// debug(' PolySegment.getPath - END\n');

		return new Path({pathpoints: pp});
	};

	PolySegment.prototype.containsSegment = function(seg) {
		for(var s=0; s<this.segments.length; s++){
			if(segmentsAreEqual(this.segments[s], seg)) return true;
		}

		return false;
	};

	PolySegment.prototype.round = function(precision) {
		precision = isval(precision)? precision : 3;

		for(var s=0; s<this.segments.length; s++){
			this.segments[s].round(precision);
		}
	};

	PolySegment.prototype.splitSegment = function(seg, t) {
		// debug('\n PolySegment.splitSegment - START');
		// if(typeof t === 'number') debug('\t ' + t);
		// else debug('\t' + json(t, true));

		var ns;

		for(var s=0; s<this.segments.length; s++){

			if(this.segments.length > 100){
				// console.warn('\t Breaking, over 100');
				return;
			}

			if(segmentsAreEqual(seg, this.segments[s])){
				ns = this.segments[s].split(t);
				// debug('\t adding at pos ' + s);
				// debug(ns);
				// debug(this.segments);
				this.segments.splice(s, 1, ns[0], ns[1]);
				s++;
				// debug(this.segments);
			}
		}

		// debug(' PolySegment.splitSegment - END\n');
	};



//	-----------------------------------
//	Intersections
//	-----------------------------------
	PolySegment.prototype.findIntersections = function() {
		// debug('\n PolySegment.findIntersections - START');
		// debug('\t ' + this.segments.length + ' segments');

		var s1, s2;
		var ix = [];

		for(var i=0; i<this.segments.length; i++){
			for(var j=i; j<this.segments.length; j++){
				if(j !== i){
					s1 = clone(this.segments[i]);
					s2 = clone(this.segments[j]);

					ix = ix.concat(findSegmentIntersections(s1, s2));
				}
			}
		}
		// debug(ix);
		ix = ix.filter(duplicates);

		// debug('\t found ' + ix.length + ' ix');
		// debug(ix);
		// debug(' PolySegment.findIntersections - END\n');
		return ix;
	};

	PolySegment.prototype.drawIntersections = function(color) {
		// debug('\n PolySegment.drawIntersections - START');
		var ix = this.findIntersections();
		var co;
		var ctx = _UI.glypheditctx;

		ctx.fillStyle = "rgb(200,50,60)";

		ix.forEach(function(v, i){
			ix[i] = ixToCoord(v);
			co = ix[i];
			ctx.fillRect(sx_cx(co.x), sy_cy(co.y), 5, 5);
		});

		// debug(ix);
		// debug(' PolySegment.drawIntersections - END\n');
	};

	PolySegment.prototype.splitSegmentsAtProvidedIntersections = function(ixarr, threshold) {
		// debug('\n PolySegment.splitSegmentsAtProvidedIntersections - START');
		// debug('\t before length ' + this.segments.length);
		// debug(this.segments);

		ixarr.forEach(function(v, i) {
			ixarr[i] = ixToCoord(v);
		});

		// debug(ixarr);

		var result = [];

		for(var s=0; s<this.segments.length; s++){
			result = result.concat(this.segments[s].splitSegmentAtProvidedCoords(ixarr, threshold));
		}

		this.segments = result;

		// debug('\t afters length ' + this.segments.length);
		// debug(' PolySegment.splitSegmentsAtProvidedIntersections - END\n');
	};

	PolySegment.prototype.stitchSegmentsTogether = function() {
		// debug('\n PolySegment.stitchSegmentsTogether - START');

		var source = new PolySegment(clone(this)).segments;
		var sorted = [];
		var result = [];

		function getNextSegment(co) {
			var ts, re;

			for(var s=0; s<source.length; s++){
				ts = source[s];
				if(ts.objtype === 'segment'){
					if(ts.containsStartPoint(co, 0)){
						re = new Segment(clone(ts));
						ts.objtype = '-' + result.length + '.' + sorted.length;
						return re;
					}
				}
			}

			// if not, try all the segments reversed
			for(var r=0; r<source.length; r++){
				ts = source[r].getReverse();
				if(source[r].objtype === 'segment'){
					if(ts.containsStartPoint(co, 0)){
						re = new Segment(clone(ts));
						source[r].objtype = 'R' + result.length + '.' + sorted.length;
						return re;
					}
				}
			}

			return false;
		}

		function getNextUnusedSegmentP1() {

			for(var s=0; s<source.length; s++){
				if(source[s].objtype === 'segment'){
					return source[s].getCoord(1);
				}
			}
		}

		// Start ordering
		var reseg;
		var nextcoord = getNextUnusedSegmentP1();
		// debug('\t starting loop');
		// debug([nextcoord]);
		// debug('\t source.length ' + source.length);

		for(var i=0; i<source.length; i++){
			reseg = getNextSegment(nextcoord);

			if(reseg){
				// debug('\t LOOP ' + i + ' added a segment,  ' + result.length + '.' + sorted.length);
				sorted.push(reseg);
				nextcoord = reseg.getCoord(4);

			} else {
				// debug('\t LOOP ' + i + ' NO NEXT SEGMENT FOUND');
				if(sorted.length){
					result.push(new PolySegment({segments:sorted}));

					if(sorted[sorted.length-1].containsEndPoint(sorted[0].getCoord(1))){
						// debug('\t\t Pushed sorted polyseg, connected nicely');
					} else {
						// debug('\t\t Pushed sorted polyseg, OPEN LOOP');
					}

					sorted = [];
					nextcoord = getNextUnusedSegmentP1();
					i--;
				}
			}
		}

		// Fencepost
		if(sorted.length){
			// debug('\t FINISHING');
			result.push(new PolySegment({segments:sorted}));

			if(sorted[sorted.length-1].containsEndPoint(sorted[0].getCoord(1))){
				// debug('\t\t Pushed sorted polyseg, connected nicely');
			} else {
				// debug('\t\t Pushed sorted polyseg, OPEN LOOP');
			}
		}

		// debug('\t SOURCE');
		// debug(source);

		result.forEach(function(v, i) {
			// debug('\n\t RETURNING ' + i);
			// debug(v.segments);
		});

		// debug(' PolySegment.stitchSegmentsTogether - END\n');

		return result;
	};



//	-----------------------------------
//	Segment Filtering
//	-----------------------------------

	PolySegment.prototype.removeZeroLengthSegments = function() {
		// debug('\n PolySegment.removeZeroLengthSegments - START');
		var len = this.segments.length;
		var s;

		for(var t=0; t<this.segments.length; t++){
			s = this.segments[t];

			if(coordsAreEqual(s.getCoord(1), s.getCoord(4))){
				if(s.line){
					s.objtype = 'LZERO';
				} else if(coordsAreEqual(s.getCoord(1), s.getCoord(2)) && coordsAreEqual(s.getCoord(1), s.getCoord(3))){
					s.objtype = 'ZERO';
				}
			}
		}

		// debug(this.segments);
		this.segments = this.segments.filter(function(v){ return v.objtype === 'segment'; });
		// debug(' PolySegment.removeZeroLengthSegments - removed ' + (len-this.segments.length) + ' - END\n');
	};

	PolySegment.prototype.removeRedundantSegments = function() {
		// debug('\n PolySegment.removeRedundantSegments - START');
		var len = this.segments.length;

		for(var s=0; s<this.segments.length; s++){
		for(var t=0; t<this.segments.length; t++){
			if(s !== t && this.segments[s] && this.segments[t]){
				if(this.segments[s].isRedundantTo(this.segments[t])){
					this.segments[s] = 'REDUNDANT';
				}
			}
		}}

		// debug(this.segments);
		this.segments = this.segments.filter(function(v){ return v.objtype === 'segment'; });
		// debug(' PolySegment.removeRedundantSegments - removed ' + (len-this.segments.length) + ' - END\n');
	};

	PolySegment.prototype.removeDuplicateSegments = function() {
		// debug('\n PolySegment.removeDuplicateSegments - START');
		var len = this.segments.length;

		for(var x=0; x<this.segments.length; x++){
		for(var y=x; y<this.segments.length; y++){
			if(x !== y && this.segments[x] && this.segments[y]){
				if(segmentsAreEqual(this.segments[x], this.segments[y])) this.segments[y].objtype = 'DUPE';
				if(segmentsAreEqual(this.segments[x], this.segments[y].getReverse())) this.segments[y].objtype = 'REVERSE';
			}
		}}

		// debug(this.segments);
		this.segments = this.segments.filter(function(v){return v.objtype === 'segment';});
		// debug(' PolySegment.removeDuplicateSegments - removed ' + (len-this.segments.length) + ' - END\n');
	};

	PolySegment.prototype.removeSegmentsOverlappingShape = function(shape) {
		// debug('\n PolySegment.removeSegmentsOverlappingShape - START');
		var len = this.segments.length;

		// debug('\t segments starting as ' + this.segments.length);
		// debug(this.segments);

		var pt = 3;
		var tx, ty;

		function testForHit(seg, split, shape){
			split = seg.splitAtTime(split);
			tx = split[0].p4x;
			ty = split[0].p4y;

			// Big hit dectection, to miss border paths
			// var re = shape.isHere(sx_cx(tx), sy_cy(ty)) &&
			// shape.isHere(sx_cx(tx), sy_cy(ty + pt)) &&
			// shape.isHere(sx_cx(tx), sy_cy(ty - pt)) &&
			// shape.isHere(sx_cx(tx + pt), sy_cy(ty)) &&
			// shape.isHere(sx_cx(tx - pt), sy_cy(ty));
			// if (re) alert('HIT ' + tx + ', ' + ty);

			if (!shape.isHere(sx_cx(tx), sy_cy(ty + pt))) return false;
			if (!shape.isHere(sx_cx(tx), sy_cy(ty - pt))) return false;
			if (!shape.isHere(sx_cx(tx + pt), sy_cy(ty))) return false;
			if (!shape.isHere(sx_cx(tx - pt), sy_cy(ty))) return false;
			if (!shape.isHere(sx_cx(tx), sy_cy(ty))) return false;

			return true;
		}

		// function testPoint(ptx, pty, shape) {
		// 	if(shape.isHere(ptx, pty)){
		// 		_UI.canvasctx.fill = 'lime';
		// 		draw_CircleHandle({'x':ptx, 'y':pty});
		// 		return true;
		// 	} else {
		// 		_UI.canvasctx.fill = 'red';
		// 		draw_CircleHandle({'x':ptx, 'y':pty});
		// 		return false;
		// 	}
		// }

		for(var s=0; s<this.segments.length; s++){

			if(testForHit(this.segments[s], 0.33, shape) && testForHit(this.segments[s], 0.66, shape)){
				// this.segments[s].drawSegmentPoints('rgb(255,0,0)', s);
				this.segments[s].objtype = 'hit';
			} else {
				// this.segments[s].drawSegmentPoints('rgb(0,255,0)', s);
			}
		}

		// debug(this.segments);
		this.segments = this.segments.filter(function(v){return v.objtype === 'segment';});

		// alert('removeSegmentsOverlappingShape - hits and misses');
		// debug(' PolySegment.removeSegmentsOverlappingShape - removed ' + (len-this.segments.length) + ' - END\n');
	};

	PolySegment.prototype.removeNonConnectingSegments = function() {
		// debug('\n PolySegment.removeNonConnectingSegments - START');
		var len = this.segments.length;
		var test, against, t1, t4;
		var connected1 = [];
		var connected4 = [];
		var threshold = 1;

		for(var t=0; t<this.segments.length; t++){
			// debug('\t testing segment ' + t);
			test = this.segments[t];
			connected1[t] = false;
			connected4[t] = false;

			for(var a=0; a<this.segments.length; a++){
				against = this.segments[a];
				// if(t !== a && against.objtype === 'segment'){
				if(t !== a){
					if(against.containsTerminalPoint(test.getCoord(1), threshold)) connected1[t] = true;
					if(against.containsTerminalPoint(test.getCoord(4), threshold)) connected4[t] = true;
					if(connected1[t] && connected4[t]) break;
				}
			}

		}

		// debug('\t segments by number, first point connected');
		// debug(json(connected1, true));

		// debug('\t segments by number, last point connected');
		// debug(json(connected4, true));

		for(var c=0; c<this.segments.length; c++){
			if(!(connected1[c] && connected4[c])) this.segments[c].objtype = "NON CONNECTED";
		}


		// debug(this.segments);
		this.segments = this.segments.filter(function(v){return v.objtype === 'segment';});
		// debug(' PolySegment.removeNonConnectingSegments - removed ' + (len-this.segments.length) + ' - END\n');
	};

	PolySegment.prototype.combineInlineSegments = function() {
		// debug('\n PolySegment.combineInlineSegments - START');
		var len = this.segments.length;

		var ts, ns;

		for(var s=0; s < this.segments.length; s++){
			ts = this.segments[s];
			ns = (s === this.segments.length-1)? this.segments[0] : this.segments[s+1];

			if(ts.line === ns.line){
				this.segments[s] = new Segment({
					'p1x': ts.p1x,
					'p1y': ts.p1y,
					'p4x': ns.p4x,
					'p4y': ns.p4y
				});

				this.segments.splice(s+1, 1);

				s--;
			}
		}

		// debug(' PolySegment.combineInlineSegments - removed ' + (len-this.segments.length) + ' - END\n');
	};
// end of file// start of file
/**
	IO > Import > Glyphr Studio Project
	Handling backwards compatibility for old Glyphr
	Studio projects via rolling upgrades.  Once
	a project has the current format, they are
	'hydrated' from simple text / JSON to full
	Glyphr Studio Objects, and saved to the _GP
	global variable.
**/

//	-------------------------------
//	IMPORT FUNCTIONS
//	-------------------------------

	function importGlyphrProjectFromText(){
		// debug('\n importGlyphrProjectFromText - START');

		var fcontent;
		try {
			fcontent = JSON.parse(_UI.droppedFileContent);
		} catch(e) {
			fcontent = {};
		}

		var tempvn = false;
		var v = false;
		var ps = fcontent.projectsettings;
		if(ps){
			tempvn = ps.versionnum;
			v = ps.version;
		}
		// debug(fcontent);


		// Check for non Glyphr Project Files
		if(!v) { error_NoVersionFound(); return; }


		// Give pre-Beta-3 accurate version
		if(!tempvn) {
			tempvn = '0.3.0';
			ps.initialversionnum = '0.3.0';
		}
		if(!ps.initialversionnum) ps.initialversionnum = tempvn;


		// Start working with the project version number
		function parseVersionNum(vn) {
			vn = vn.split(".");
			return {
				'major' : (vn[0]*1),
				'minor' : (vn[1]*1),
				'patch' : (vn[2]*1)
			};
		}

		var projvn = parseVersionNum(tempvn);
		var currvn = parseVersionNum(_UI.thisGlyphrStudioVersionNum);
		// debug("\t versionnum found " + tempvn);


		// Check for future versions
		if(projvn.major > currvn.major){ error_TimeTraveller(); return; }


		// Roll upgrades through Beta
		if(projvn.major === 0) {
			fcontent = migrate_betas_to_v1(fcontent, projvn.minor);
			projvn.major = 1;
			projvn.minor = 0;
		}
		// debug('\t done with beta updates');


		// Roll upgrades through v1
		if(projvn.major === 1){

			// Check for future versions
			if(projvn.minor > currvn.minor){ error_TimeTraveller(); return; }

			// Roll through minor versions
			if(projvn.minor < 10){
				fcontent.projectsettings.glyphrange.latinsupplement = fcontent.projectsettings.glyphrange.latinsuppliment;
				delete fcontent.projectsettings.glyphrange.latinsuppliment;
			}
		}
		// debug('\t done with v1 minor updates');


		// Update the version
		ps.versionnum = _UI.thisGlyphrStudioVersionNum;
		ps.version = _UI.thisGlyphrStudioVersion;


		// Hydrate after all updates
		hydrateGlyphrProject(fcontent);
		// debug(' importGlyphrProjectFromText - END\n');
	}

	function error_NoVersionFound(){
		var msg = 'No version information was found.  Either the file is not a Glyphr Studio Project, or the file has non-valid JSON data.  Please try a different file...';
		console.warn(msg);
		alert(msg);
	}

	function error_TimeTraveller(){
		var msg = 'Your Glyphr Project was created with a later version of Glyphr Studio.  This version of Glyphr Studio cannot open project files created in the future O_o (whoa).  Please go to glyphrstudio.com to get the latest release.';
		console.warn(msg);
		alert(msg);
	}

//	------------------------
//	MIGRATE
//	------------------------

	function migrate_betas_to_v1 (fcontent, minor) {
		// debug('\n migrate_betas_to_v1 - START');
		// debug(fcontent);
		// Start rolling upgrades

		switch (minor){
			case 3:
				// debug("\t Minor Version === 3");
				fcontent = migrate_0_3_to_0_4(fcontent);
				minor = 4;
				// debug('\t migrated to 0.4');
			case 4:
				// debug("\t Minor Version === 4");
				fcontent = migrate_0_4_to_0_5(fcontent);
				minor = 5;
				// debug('\t migrated to 0.5');
			case 5:
				// debug("\t Minor Version === 5");
				fcontent = migrate_0_5_to_1_0(fcontent);

				// debug('\t migrated to 1.0');
		}

		// debug(' migrate_betas_to_v1 - END\n');
		return fcontent;
	}

	function migrate_0_5_to_1_0 (fc) {
		// debug('\n migrate_0_5_to_1_0 - START');

		// Update new top level objects
		fc.glyphs = clone(fc.fontchars);
		fc.components = clone(fc.linkedshapes);
		fc.projectsettings.glyphrange = clone(fc.projectsettings.charrange);
		delete fc.fontchars;
		delete fc.linkedshapes;
		delete fc.projectsettings.charrange;
		// debug('\t DONE tlo');


		// Upgrade Linked Shapes to full Glyphs
		var com,sh,ui,gn;
		for(var c in fc.components){ if(fc.components.hasOwnProperty(c)){
			com = fc.components[c];
			if(com.shape){
				sh = [com.shape];
				gn = com.shape.name || 'Shape';
			} else {
				sh = [];
				gn = 'Shape';
			}
			ui = com.usedin? com.usedin : [];
			fc.components[c] = new Glyph({'shapes':sh, 'usedin':ui, 'name':gn, 'glyphhtml':''});
		}}
		// debug('\t DONE ls > glyph');


		// Switch from Char to Glyph
		// Switch from Ligature to Glyph
		// Update Glyphs to use Components not Linked Shapes
		for(var g in fc.glyphs){ if(fc.glyphs.hasOwnProperty(g)){
			fc.glyphs[g] = charToGlyph(fc.glyphs[g]);
		}}

		for(var l in fc.ligatures){ if(fc.ligatures.hasOwnProperty(l)){
			fc.ligatures[l] = charToGlyph(fc.ligatures[l]);
		}}



		// debug(fc);
		// debug(' migrate_0_5_to_1_0 - END\n');
		return fc;
	}

	function charToGlyph(gl) {
		var gshapes, dx, dy;
		gl.shapes = gl.charshapes || [];
		gl.name = gl.charname || false;
		gl.glyphhtml = gl.charhtml || false;
		gl.glyphwidth = gl.charwidth || false;
		delete gl.charshapes;
		delete gl.charname;
		delete gl.charhtml;
		delete gl.charwidth;

		gshapes = gl.shapes;
		// debug('\t Glyph ' + gl.charname);
		for(var s=0; s<gshapes.length; s++){
			sh = gshapes[s];
			if(sh.objtype === 'linkedshapeinstance'){
				dx = sh.uselinkedshapexy? 0 : sh.xpos;
				dy = sh.uselinkedshapexy? 0 : sh.ypos;
				gshapes[s] = new ComponentInstance({'name':sh.name, 'link':sh.link, 'translatex':dx, 'translatey':dy, 'xlock':sh.xlock, 'ylock':sh.ylock});
			}


			if(isval(gshapes[s].uselinkedshapexy)){
				// debug('\t\t shape ' + gshapes[s].name + ' uselsxy: ' + typeof gshapes[s].uselinkedshapexy + ' ' + gshapes[s].uselinkedshapexy);
				gshapes[s].usecomponentxy = gshapes[s].uselinkedshapexy;
				delete gshapes[s].uselinkedshapexy;
				// debug('\t\t now usecomxy: ' + gshapes[s].usecomponentxy);
			}
		}

		return gl;
	}

	function migrate_0_4_to_0_5(fc) {
		// debug('\n migrate_0_4_to_0_5 - START');
		var tc;

		for(var i in fc.fontchars){ if(fc.fontchars.hasOwnProperty(i)){
			tc = fc.fontchars[i];
			// debug("migrate_0_3_to_0_4 - fontchars " + i + " is " + tc);
			tc.charwidth = tc.advancewidth || fc.projectsettings.upm || 1000;
		}}
		// debug(fc);
		// debug(' migrate_0_4_to_0_5 - END\n');
		return fc;
	}

	function migrate_0_3_to_0_4(fc){
		// debug('\n migrate_0_3_to_0_4 - START');
		newgp = new GlyphrProject();

		var tls;
		for(var l in fc.linkedshapes){
			if(fc.linkedshapes.hasOwnProperty(l)){
				tls = fc.linkedshapes[l];
				//debug("migrate_0_3_to_0_4 - usedin before " + tls.usedin);
				if(tls.usedin){
					for(var u=0; u<tls.usedin.length; u++){
						tls.usedin[u] = decToHex(tls.usedin[u]);
					}
					//debug("migrate_0_3_to_0_4 - usedin after " + tls.usedin);
				}
			}
		}

		var newps = newgp.projectsettings;
		for(var e in fc.projectsettings){
			if(newps.hasOwnProperty(e)){
				newps[e] = fc.projectsettings[e];
			}
		}
		fc.projectsettings = newps;

		var tc, hex;
		for(var i=0; i<fc.fontchars.length; i++){
			tc = fc.fontchars[i];
			//debug("migrate_0_3_to_0_4 - fontchars " + i + " is " + tc);
			if(tc){
				hex = "0x00"+tc.cmapcode.substr(2).toUpperCase();
				fc.fontchars[hex] = tc;
				fc.fontchars[hex].charhtml = hexToHTML(hex);
				//debug("migrate_0_3_to_0_4 - fc.fontchars[" + hex + "] is " + json(fc.fontchars[hex]));
			}
		}
		// debug(fc);
		// debug(' migrate_0_3_to_0_4 - END\n');
		return fc;
	}



//	-------------------------------
//	HYDRATE
//	-------------------------------

	function hydrateGlyphrProject(data, callback) {
		// debug("\n hydrateGlyphrProject - START");
		// debug("\t passed: ");
		// debug(data);

		_GP = new GlyphrProject();
		// var oggp = new GlyphrProject();


		// Project Settings
		// merge settings to conform to current .projectsettings
		// but not guides, because they can be custom
		var dataguides = clone(data.projectsettings.guides);

		if(data.projectsettings) {
			_GP.projectsettings = merge(_GP.projectsettings, data.projectsettings);
			_GP.projectsettings.glyphrange.custom = data.projectsettings.glyphrange.custom || [];
		}
		_GP.projectsettings.projectid = _GP.projectsettings.projectid || genProjectID();
		_GP.projectsettings.descent = -1 * Math.abs(_GP.projectsettings.descent);
		// debug('\t finished merging projectsettings');
		// debug(_GP.projectsettings);


		// Guides
		hydrateGlyphrObjectList(Guide, dataguides, _GP.projectsettings.guides);
		// debug('\t finished hydrating guides');


		// Metadata
		if(data.metadata) _GP.metadata = merge(_GP.metadata, data.metadata, true);
		// debug('\t finished merging metadata');


		// Components
		hydrateGlyphrObjectList(Glyph, data.components, _GP.components);
		// debug('\t finished hydrating components');


		// Glyphs
		hydrateGlyphrObjectList(Glyph, data.glyphs, _GP.glyphs);
		// debug('\t finished hydrating glyphs');


		// Ligatures
		hydrateGlyphrObjectList(Glyph, data.ligatures, _GP.ligatures);
		// debug('\t finished hydrating ligatures');


		// Kerning
		hydrateGlyphrObjectList(HKern, data.kerning, _GP.kerning);
		// debug('\t finished hydrating kern pairs');


		// debug('\t hydrated: ');
		// debug(_GP);
		// debug("hydrateGlyphrProject - END\n");

		if(callback) callback();
		if(!_UI.coremode) finalizeGlyphrProject();
		//navigate();
	}


	// Takes raw JSON objects, and initializes them as Glyphr Studio objects
	function hydrateGlyphrObjectList(glyphrobject, source, destination) {
		for (var key in source) {
			if(source.hasOwnProperty(key)){
				destination[key] = new glyphrobject(source[key]);
			}
		}
	}


	// Takes a template object of expected keys and default values
	// and an object to import, and overwites template values if
	// they exist in the imported object
	function merge(template, importing, trim) {
		for(var a in template){
			if(template.hasOwnProperty(a)){
				if(typeof template[a] === 'object'){
					if(importing.hasOwnProperty(a)) template[a] = merge(template[a], importing[a]);
				} else {
					if(importing.hasOwnProperty(a)){
						if(typeof importing[a] === 'string' && trim) template[a] = removeEmptyStringInputs(importing[a]);
						else template[a] = importing[a];
					}
				}
			}
		}

		return template;
	}


	function newGlyphrProject(){
		var fn;
		if(document.getElementById('newprojectname') && document.getElementById('newprojectname').value){
			fn = document.getElementById('newprojectname').value;
		} else {
			fn = 'My Font';
		}

		_GP = new GlyphrProject();

		_GP.projectsettings.name = fn;
		_GP.metadata.font_family = fn.substr(0, 31);

		_GP.projectsettings.version =  _UI.thisGlyphrStudioVersion;
		_GP.projectsettings.versionnum =  _UI.thisGlyphrStudioVersionNum;
		_GP.projectsettings.projectid = genProjectID();

		getGlyph('0x0020', true).isautowide = false;
		getGlyph('0x0020', true).glyphwidth = Math.round(_GP.projectsettings.upm/3);
		getGlyph('0x0041', true);

		finalizeGlyphrProject();
		//navigate();
	}

	function finalizeGlyphrProject(){
		// debug("finalizeGlyphrProject \t START");

		// UI Defaults
		_UI.history['glyph edit'] = new History('glyphs');
		_UI.history.components = new History('components');
		_UI.history.ligatures = new History('ligatures');
		_UI.history.kerning = new History('kerning');

		_UI.guides.leftgroup_xmax = new Guide(_UI.guides.leftgroup_xmax);
		_UI.guides.rightgroup_xmin = new Guide(_UI.guides.rightgroup_xmin);

		var ps = _GP.projectsettings;

		ps.guides.ascent = ps.guides.ascent ||  new Guide({name:'ascent', type:'horizontal', location: ps.ascent, editable:false, color: ps.colors.guide_med});
		ps.guides.capheight = ps.guides.capheight ||  new Guide({name:'capheight', type:'horizontal', location: ps.capheight, editable:false, color: ps.colors.guide_light});
		ps.guides.xheight = ps.guides.xheight ||  new Guide({name:'xheight', type:'horizontal', location: ps.xheight, editable:false, color: ps.colors.guide_light});
		ps.guides.baseline = ps.guides.baseline ||  new Guide({name:'baseline', type:'horizontal', location:0, editable:false, color: ps.colors.guide_dark});
		ps.guides.descent = ps.guides.descent ||  new Guide({name:'descent', type:'horizontal', location:( ps.ascent- ps.upm), editable:false, color: ps.colors.guide_med});
		ps.guides.leftside = ps.guides.leftside ||  new Guide({name:'leftside', type:'vertical', location: ps.defaultlsb*-1, editable:false, color: ps.colors.guide_dark});
		ps.guides.rightside = ps.guides.rightside ||  new Guide({name:'rightside', type:'vertical', location: ps.upm, editable:false, color: ps.colors.guide_dark});
		ps.guides.zero = ps.guides.zero ||  new Guide({name:'zero', type:'vertical', showname:false, location:0, editable:false, color: ps.colors.guide_med});
		ps.guides.min = ps.guides.min ||  new Guide({name:'min', type:'vertical', showname:false, location: ps.upm, editable:false, color: ps.colors.guide_light});
		ps.guides.max = ps.guides.max ||  new Guide({name:'max', type:'vertical', showname:false, location: ps.upm, editable:false, color: ps.colors.guide_light});

		_UI.selectedglyph = _UI.selectedglyph || getFirstGlyphID();
		_UI.selectedligature = _UI.selectedligature || getFirstID(_GP.ligatures);
		_UI.selectedcomponent = _UI.selectedcomponent || getFirstID(_GP.components);
		_UI.selectedkern = _UI.selectedkern || getFirstID(_GP.kerning);

		var sp = getGlyph('0x0020', true);
		if(!sp.isautowide && sp.glyphwidth === 0) sp.glyphwidth = Math.round(_GP.projectsettings.upm/3);

		calculateDefaultView();
		resetThumbView();

		_UI.current_page = "glyph edit";

		// debug("finalizeGlyphrProject \t END\n");
	}

// end of file// start of file
/**
	IO > Export > SVG Font
	Converting a Glyphr Studio Project to XML in 
	a SVG Font format.
**/


	function ioSVG_exportSVGfont() {
		// debug('\n ioSVG_exportSVGfont - Start');
		var ps = _GP.projectsettings;
		var md = _GP.metadata;
		var family = md.font_family;
		var familyid = family.replace(/ /g, '_');
		var timestamp = genDateStampSuffix();
		var timeoutput = timestamp.split('-');
		timeoutput[0] = timeoutput[0].replace(/\./g, '-');
		timeoutput[1] = timeoutput[1].replace(/\./g, ':');
		timeoutput = timeoutput.join(' at ');

		var con = '<?xml version="1.0"?>\n'+
			// '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >\n'+
			'<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n'+
			'\t<metadata>\n\n'+
			'\t\tProject: ' + ps.name + '\n'+
			'\t\tFont exported on ' + timeoutput + '\n\n'+
			'\t\tCreated with Glyphr Studio - the free, web-based font editor\n'+
			'\t\t' + _UI.thisGlyphrStudioVersion + '\n'+
			'\t\t' + _UI.thisGlyphrStudioVersionNum + '\n\n'+
			'\t\tFind out more at www.glyphrstudio.com\n\n'+
			'\t</metadata>\n'+
			'\t<defs>\n'+
			'\t\t<font id="'+escapeXMLValues(familyid)+'" horiz-adv-x="'+ps.upm+'">\n'+
			'\t\t\t<font-face\n'+ ioSVG_makeFontFace()+'\n'+
			'\t\t\t\t<font-face-src>\n'+
			'\t\t\t\t\t<font-face-name name="'+escapeXMLValues(family)+'" />\n'+
			'\t\t\t\t</font-face-src>\n'+
			'\t\t\t</font-face>\n';

		con += '\n';
		con += ioSVG_makeMissingGlyph();
		con += '\n\n';
		con += ioSVG_makeAllGlyphsAndLigatures();
		con += '\n';
		con += ioSVG_makeAllKernPairs();
		con += '\n';

		con += '\t\t</font>\n'+
			'\t</defs>\n\n';

		// con += '\t<style type="text/css">\n';
		// con += '\t\t@font-face {\n';
		// con += '\t\t\tfont-family: "'+family+'", monospace;\n';
		// con += '\t\t\tsrc: url(#'+familyid+');\n';
		// con += '\t\t}\n';
		// con += '\t</style>\n\n';

		con += '\t<text x="100" y="150" style="font-size:48px;" font-family="'+family+'">'+family+'</text>\n';
		con += '\t<text x="100" y="220" style="font-size:48px;" font-family="'+family+'">ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>\n';
		con += '\t<text x="100" y="290" style="font-size:48px;" font-family="'+family+'">abcdefghijklmnopqrstuvwxyz</text>\n';
		con += '\t<text x="100" y="360" style="font-size:48px;" font-family="'+family+'">1234567890</text>\n';
		con += '\t<text x="100" y="430" style="font-size:48px;" font-family="'+family+'">!\"#$%&amp;\'()*+,-./:;&lt;=&gt;?@[\\]^_`{|}~</text>\n';

		con += '</svg>';

		var filename = ps.name + ' - SVG Font - ' + timestamp + '.svg';

		saveFile(filename, con);

		// debug(' ioSVG_exportSVGfont - END\n');
	}

	function ioSVG_makeFontFace() {
		// debug('\n ioSVG_makeFontFace - START');
		calcFontMaxes();
		var t = '\t\t\t\t';
		var md = _GP.metadata;
		var ps = _GP.projectsettings;
		var fm = _UI.fontmetrics;
		var con = '';

		// Project properties
		con += t+'units-per-em="'+ps.upm+'"\n';
		con += t+'cap-height="'+ps.capheight+'"\n';
		con += t+'x-height="'+ps.xheight+'"\n';
		con += t+'ascent="'+ps.ascent+'"\n';
		con += t+'descent="'+ps.descent+'"\n';
		con += t+'bbox="'+fm.maxes.xmin+', '+fm.maxes.ymin+', '+fm.maxes.xmax+', '+fm.maxes.ymax+'"\n';
		con += t+'unicode-range="U+20-'+fm.maxglyph+'"\n';

		// Metadata properties
		for(var d in md){if(md.hasOwnProperty(d)){
			if(md[d] !== '{{sectionbreak}}'){
				con += t;
				con += d.replace(/_/g, '-');
				con += ' = "';
				con += escapeXMLValues(removeEmptyStringInputs(md[d]));
				con += '"\n';
			}
		}}
		con = con.substring(0, con.length-1);
		con += '>';

		// debug(' ioSVG_makeFontFace - END\n');
		return con;
	}

	function ioSVG_makeMissingGlyph() {
		// debug('\n ioSVG_makeMissingGlyph - START');
		var con = '		 ';
		var gh = _GP.projectsettings.ascent;
		var gw = round(gh * 0.618);
		var gt = round(gh/100);

		con += '\t<missing-glyph horiz-adv-x="'+gw+'" ';
		con += 'd="M0,0 v'+gh+' h'+gw+' v-'+gh+' h-'+gw+'z ';
		con += 'M'+gt+','+gt+' v'+(gh-(gt*2))+' h'+(gw-(gt*2))+' v-'+(gh-(gt*2))+' h-'+(gw-(gt*2))+'z';
		con += '" />';

		// debug(' ioSVG_makeMissingGlyph - END\n');
		return con;
	}

	function ioSVG_makeAllGlyphsAndLigatures() {
		// debug('\n ioSVG_makeAllGlyphsAndLigatures - START');

		//<glyph glyph-name="uniFEDF_uniFEE0_uniFBAB.liga" unicode="&#xfedf;&#xfee0;&#xfbab;" horiz-adv-x="1262" d="M1224 5

		var fc = _GP.glyphs;
		var con = '';
		var ranges = assembleActiveRanges();

		sortLigatures();
		var li = _GP.ligatures;
		con += '\t\t\t<!-- Ligatures -->\n';
		for(var l in li){ if (li.hasOwnProperty(l)){
			con += ioSVG_makeOneGlyphOrLigature(li[l], l);
		}}

		con += '\n';

		con += '\t\t\t<!-- Glyphs -->\n';
		for(var c in fc){ if (fc.hasOwnProperty(c) && isGlyphInActiveRange(c, ranges)){
			con += ioSVG_makeOneGlyphOrLigature(fc[c], c);
		}}

		// debug(' ioSVG_makeAllGlyphsAndLigatures - END\n');
		return con;
	}

	function ioSVG_makeOneGlyphOrLigature(gl, uni) {
		// if(!gl.shapes.length && !gl.getAdvanceWidth()) return '';	
		// Results in lots of special unicoded glyphs with no shapes
		if(!gl.shapes.length && uni!=0x0020) {
			console.warn('Glyph ' + uni + ' not exported: No shapes.');
			return '';
		}


		uni = uni.split('0x');
		uni.forEach(function(v, i, a){
			// only export glyph if it has a valid hexadecimal unicode
			if(!validateHex(v)) {
				console.warn('Glyph ' + uni.join('') + ' not exported: Bad hex value.');
				return '';
			}

			if(v) a[i] = '&#x'+v+';';
		});
		uni = uni.join('');

		if(_GP.projectsettings.combineshapesonexport) gl = new Glyph(gl).flattenGlyph().combineAllShapes(true);
		var pathdata = gl.getSVGpathData();
		pathdata = pathdata || 'M0,0Z';

		var con = '\t\t\t';
		con += '<glyph glyph-name="'+gl.name.replace(/ /g, '_')+'" ';
		con += 'unicode="'+uni+'" ';
		con += 'horiz-adv-x="'+gl.getAdvanceWidth()+'" ';
		con += 'd="'+pathdata+'" />\n';
		return con;
	}

	function ioSVG_makeAllKernPairs() {
		// debug('\n ioSVG_makeAllKernPairs - START');
		var kp = _GP.kerning;
		var con = '\t\t\t<!-- Kern Pairs -->\n';

		for(var k in kp){ if (kp.hasOwnProperty(k)){
			for(var lg=0; lg<kp[k].leftgroup.length; lg++){
				for(var rg=0; rg<kp[k].rightgroup.length; rg++){
					con += '\t\t\t<hkern ';
					con += 'u1="'+hexToUnicodeHex(kp[k].leftgroup[lg])+'" ';
					con += 'u2="'+hexToUnicodeHex(kp[k].rightgroup[rg])+'" ';
					con += 'k="'+kp[k].value+'" />\n';
				}
			}
		}}

		// debug(' ioSVG_makeAllKernPairs - END\n');
		return con;
	}

	function escapeXMLValues(val) {
		// debug('\n escapeXMLValues - START');
		// debug('\t typeof val = ' + typeof val);
		// debug(val);

		if(typeof val === 'string'){
			if(val === '""' || val === "''") return '';
			
			if(val.indexOf('&') > -1) {
				// debug('\t replacing ampersand');
				val = val.replace(/&/g, '&amp;');
			}

			if(val.indexOf('"') > -1) {
				// debug('\t replacing double quotes');
				val = val.replace(/"/g, '&quot;');
			}
			
			if(val.indexOf("'") > -1){
				// debug('\t replacing single quotes');
				val = val.replace(/'/g, '&apos;');
			}
			
			if(val.indexOf('<') > -1) {
				// debug('\t replacing less than');
				val = val.replace(/</g, '&lt;');
			}
			
			if(val.indexOf('>') > -1) {
				// debug('\t replacing greater than');
				val = val.replace(/>/g, '&gt;');
			}
		}

		// debug('\t returning ' + JSON.stringify(val));
		return val;
	}

// end of file// start of file
/**
	IO > Export > OpenType
	Using OpenType.js to convert a Glyphr Studio 
	Project into OpenType.js format for saving.
**/


	function ioOTF_exportOTFfont() {
		// debug('\n ioOTF_exportOTFfont - START');
		// debug('\t combineshapesonexport = ' + _GP.projectsettings.combineshapesonexport);
		
		function firstExportStep() {
			// debug('\n firstExportStep - START');

			// Add metadata
			var md = _GP.metadata;
			var ps = _GP.projectsettings;

			options.unitsPerEm = ps.upm || 1000;
			options.ascender = ps.ascent || 0.00001;
			options.descender = (-1 * Math.abs(ps.descent)) || -0.00001;
			options.familyName = (md.font_family) || ' ';
			options.styleName = (md.font_style) || ' ';
			options.designer = (md.designer) || ' ';
			options.designerURL = (md.designerURL) || ' ';
			options.manufacturer = (md.manufacturer) || ' ';
			options.manufacturerURL = (md.manufacturerURL) || ' ';
			options.license = (md.license) || ' ';
			options.licenseURL = (md.licenseURL) || ' ';
			options.version = (md.version) || 'Version 0.001';
			options.description = (md.description) || ' ';
			options.copyright = (md.copyright) || ' ';
			options.trademark = (md.trademark) || ' ';
			options.glyphs = [];

			// debug('\t NEW options ARG BEFORE GLYPHS');
			// debug(options);
			// debug('\t options.version ' + options.version);

			// Add Notdef
			var notdef = new Glyph({'name': 'notdef', 'shapes':JSON.parse(_UI.notdefglyphshapes)});
			if(_GP.upm !== 1000){
				var delta = _GP.upm / 1000;
				notdef.updateGlyphSize(delta, delta, true);
			}

			var ndpath = notdef.makeOpenTypeJSpath();

			options.glyphs.push(new opentype.Glyph({
				name: '.notdef',
				unicode: 0,
				index: getNextGlyphIndex(),
				advanceWidth: round(notdef.getAdvanceWidth()),
				xMin: round(notdef.maxes.xmin),
				xMax: round(notdef.maxes.xmax),
				yMin: round(notdef.maxes.ymin),
				yMax: round(notdef.maxes.ymax),
				path: ndpath
			}));

			// debug(' firstExportStep - END\n');
		}

		function getNextGlyphIndex() { return glyphIndex++; }

		var privateUseArea = [];

		function getNextLigatureCodePoint() {
			while(ligatureCodePoint < 0xF8FF){
				if(privateUseArea.includes(ligatureCodePoint)){
					ligatureCodePoint++;
				} else {
					privateUseArea.push(ligatureCodePoint);
					return ligatureCodePoint;				
				}
			}

			// Fallback.  This really shouldn't happen... but if somebody
			// has used the entire Private Use area, I guess we'll just
			// start throwing Ligatures into the Korean block?

			console.warn('The entire Unicode Private Use Area (U+E000 to U+F8FF) seems to be taken. Ligatures will now be added to the block starting at U+AC00.');
			ligatureCodePoint = 0xAC00;
			return getNextLigatureCodePoint();
		}

		function populateExportLists() {
			// debug('\n populateExportLists - START');

			// Add Glyphs
			var ranges = assembleActiveRanges();

			for(var c in _GP.glyphs){ if(_GP.glyphs.hasOwnProperty(c) && isGlyphInActiveRange(c, ranges)){
				if(parseInt(c)){
					tg = new Glyph(clone(_GP.glyphs[c]));
					debug(`\t adding glyph ${c} "${tg.name}"`);
					exportGlyphs.push({xg:tg, xc: c});
					if(parseInt(c) >= 0xE000) privateUseArea.push(parseInt(c));

				} else {
					console.warn('Skipped exporting Glyph ' + c + ' - non-numeric key value.');
				}
			}}
			
			exportGlyphs.sort(function(a,b){ return a.xc - b.xc; });
			
			// Add Ligatures
			var ligWithCodePoint;
			for(var l in _GP.ligatures){ if(_GP.ligatures.hasOwnProperty(l)){
				tg = new Glyph(clone(_GP.ligatures[l]));
				// debug(`\t adding ligature "${tg.name}"`);
				exportLigatures.push({xg:tg, xc: l});

				ligWithCodePoint = doesLigatureHaveCodePoint(l);
				if(ligWithCodePoint) exportGlyphs.push({xg:tg, xc:ligWithCodePoint.point});				
			}}

			// debug(' populateExportLists - END\n');
		}

		function generateOneGlyph() {
			// debug('\n generateOneGlyph - START');
			// export this glyph
			var glyph = currentExportItem.xg;
			var num = currentExportItem.xc;
			var comb = _GP.projectsettings.combineshapesonexport;
			var name = getUnicodeShortName(''+decToHex(num));

			showToast('Exporting<br>'+glyph.name, 999999);

			if(comb && glyph.shapes.length <= _GP.projectsettings.maxcombineshapesonexport) glyph.combineAllShapes(true);

			if(glyph.isautowide) {
				glyph.updateGlyphPosition(glyph.getLSB(), 0, true);
				glyph.leftsidebearing = 0;
			}

			var tgpath = glyph.makeOpenTypeJSpath(new opentype.Path());

			var index = getNextGlyphIndex();

			var glyphInfo = {
				name: name,
				unicode: parseInt(num),
				index: index,
				advanceWidth: round(glyph.getAdvanceWidth() || 1),	// has to be non-zero
				path: tgpath
			};
			
			codePointGlyphIndexTable[''+decToHex(num)] = index;

			// debug(glyphInfo);
			// debug(glyphInfo.path);

			// Add this finshed glyph
			options.glyphs.push(new opentype.Glyph(glyphInfo));


			// start the next one
			currentExportNumber++;

			if(currentExportNumber < exportGlyphs.length){
				currentExportItem = exportGlyphs[currentExportNumber];
				setTimeout(generateOneGlyph, 10);

			} else {

				if(exportLigatures.length){
					// debug('\t codePointGlyphIndexTable');
					// debug(codePointGlyphIndexTable);

					currentExportNumber = 0;
					currentExportItem = exportLigatures[0];
					setTimeout(generateOneLigature, 10);
				} else {
					showToast('Finalizing...', 10);
					setTimeout(lastExportStep, 10);
				}
			}

			// debug(' generateOneGlyph - END\n');
		}
		
		function generateOneLigature(){
			// debug('\n generateOneLigature - START');
			// export this glyph
			var liga = currentExportItem.xg;
			var ligaID = currentExportItem.xc;
			var comb = _GP.projectsettings.combineshapesonexport;
			
			// debug('\t doing ' + ligaID + ' ' + liga.name);

			showToast('Exporting<br>'+liga.name, 999999);

			if(comb && liga.shapes.length <= _GP.projectsettings.maxcombineshapesonexport) liga.combineAllShapes(true);

			if(liga.isautowide) {
				liga.updateGlyphPosition(liga.getLSB(), 0, true);
				liga.leftsidebearing = 0;
			}

			var tgpath = liga.makeOpenTypeJSpath(new opentype.Path());
			
			var ligaCodePoint = getNextLigatureCodePoint();
			var index = getNextGlyphIndex();

			var glyphInfo = {
				name: liga.name,
				unicode: ligaCodePoint,
				index: index,
				advanceWidth: round(liga.getAdvanceWidth() || 1),	// has to be non-zero
				path: tgpath
			};
			
			// Add ligature glyph to the font
			options.glyphs.push(new opentype.Glyph(glyphInfo));

			// Add substitution info to font
			var subList = hexToChars(ligaID).split('');
			var indexList = subList.map(function(v){ return codePointGlyphIndexTable[charToHex(v)]; });
			// debug('\t INDEX sub: [' + indexList + '] by: ' + index + ' which is ' + ligaCodePoint);
			ligatureSubstitutions.push({sub: indexList, by: index});

			// debug(glyphInfo);

			// start the next one
			currentExportNumber++;

			if(currentExportNumber < exportLigatures.length){
				currentExportItem = exportLigatures[currentExportNumber];
				setTimeout(generateOneLigature, 10);
			} else {
				showToast('Finalizing...', 10);
				setTimeout(lastExportStep, 10);
			}
		}
		
		function lastExportStep() {	
			// Export
			_UI.stoppagenavigation = false;
			
			options.glyphs.sort(function(a,b){ return a.unicode - b.unicode; });
			var font = new opentype.Font(options);

			for(var s=0; s<ligatureSubstitutions.length; s++) {
				font.substitution.addLigature('liga', ligatureSubstitutions[s]);
			}

			// debug('\t Font object:');
			// debug(font.glyphs);
			// debug(font.toTables());

			font.download();
			setTimeout(function(){_UI.stoppagenavigation = true;}, 2000);
			// debug(' lastExportStep - END\n');
		}



		/*
			MAIN EXPORT LOOP
		*/
		var options = {};
		var codePointGlyphIndexTable = {};
		var glyphIndex = 0;
		var ligatureCodePoint = 0xE000;
		var ligatureSubstitutions = [];
		var exportGlyphs = [];
		var exportLigatures = [];
		var currentExportNumber = 0;
		var currentExportItem ={};

		firstExportStep();
		populateExportLists();
		currentExportItem = exportGlyphs[0];
		generateOneGlyph();


		// debug(' ioOTF_exportOTFfont - END\n');
	}
	
	function assembleActiveRanges() {
		debug(`\n assembleActiveRanges - START`);
		var ranges = clone(_GP.projectsettings.glyphrange.custom);
		if(_GP.projectsettings.glyphrange.latinextendedb) ranges.unshift({begin: _UI.glyphrange.latinextendedb.begin, end: _UI.glyphrange.latinextendedb.end});
		if(_GP.projectsettings.glyphrange.latinextendeda) ranges.unshift({begin: _UI.glyphrange.latinextendeda.begin, end: _UI.glyphrange.latinextendeda.end});
		if(_GP.projectsettings.glyphrange.latinsupplement) ranges.unshift({begin: _UI.glyphrange.latinsupplement.begin, end: _UI.glyphrange.latinsupplement.end});
		if(_GP.projectsettings.glyphrange.basiclatin) ranges.unshift({begin: _UI.glyphrange.basiclatin.begin, end: _UI.glyphrange.basiclatin.end});
		
		debug(ranges);
		debug(` assembleActiveRanges - END\n\n`);

		return ranges;
	}

	function isGlyphInActiveRange(gid, ranges){
		// debug(`\n isGlyphInActiveRange - START`);
		// debug(`\t ranges.length = ${ranges.length}`);
		
		for(var r=0; r<ranges.length; r++){
			// debug(`\t testing ${gid} >= ${ranges[r].begin} && ${gid} <= ${ranges[r].end}`);
			if(gid >= ranges[r].begin && gid <= ranges[r].end) {
				// debug(`\t returning ^^true^^ for ${gid}`);
				return true;
			}
		}
			
		// debug(`\t returning __false__ for ${gid}`);
		return false;
	}// start of file
/**
	Page > Font Settings
	HTML and associated functions for this page.
**/


	function loadPage_fontsettings(){
		// debug('LOADING PAGE >> loadPage_fontsettings');
		// SETTINGS
		var ps = _GP.projectsettings;
		var meta = _GP.metadata;

		var content = '<h1 class="pagetitle">Font Settings</h1><div class="pagecontent textpage">';

		content += '<h1>Font Name</h1>';
		content += '<input type="text" maxlength=31 style="width:300px; padding:8px; font-size:1.2em;" value="'+meta.font_family+'" onchange="_GP.metadata.font_family = this.value.substr(0, 31);"/><span class="unit">(max 31 characters)</span>';

		content += '<h1>Glyph Proportions</h1>';

		content += '<h3>Key Metrics</h3>'+
					'<table class="settingstable">'+
					'<tr><td>Ascent height: </td><td><input type="number" value="'+ps.ascent+'" onchange="_GP.projectsettings.ascent = Math.abs(parseInt(this.value));"></td><td><span class="unit">(em units)</span></td></tr>' +
					'<tr><td>Cap height: </td><td><input type="number" value="'+ps.capheight+'" onchange="_GP.projectsettings.capheight = Math.abs(parseInt(this.value));"></td><td><span class="unit">(em units)</span></td></tr>' +
					'<tr><td>x Height: </td><td><input type="number" id="metric-xheight" value="'+ps.xheight+'" onchange="_GP.projectsettings.xheight = Math.abs(parseInt(this.value));"></td><td><span class="unit">(em units)</span></td></tr>' +
					'<tr><td>Descent height: </td><td><input type="number" id="metric-des" value="'+ps.descent+'" onchange="_GP.projectsettings.descent = Math.abs(parseInt(this.value))*-1;"/></td><td><span class="unit">(em units)</span></td></tr>' +
					'<tr><td><b>Total Units per Em: </b></td><td><input type="number" value="'+ps.upm+'" onchange="_GP.projectsettings.upm = Math.abs(parseInt(this.value));"/></td><td><span class="unit">(em units)</span></td></tr>' +
					'</table>';

		content += '<h3>Overshoot</h3>'+
					'Round letters usually extend a little above the x height line and below the baseline. ' +
					'A light guideline will show this overshoot distance.<br>' +
					'<table class="settingstable">'+
					'<tr><td>Overshoot:</td><td><input type="number" value="'+ps.overshoot+'" onchange="_GP.projectsettings.overshoot = this.value;"></td><td><span class="unit">(em units)</span></td></tr>'+
					'</table>';

		content += '<h3>Default Side Bearings</h3>' +
					'Side Bearings are the amount of blank space that is added to the left or right of glyphs when they are displayed.  This metric can be set individually per glyph, but will default to this value if not set. '+
					'<table class="settingstable">'+
					'<tr><td>Left Side Bearing: </td><td><input type="number" value="'+ps.defaultlsb+'" onchange="_GP.projectsettings.defaultlsb = Math.abs(parseInt(this.value)) || 0;"></td><td><span class="unit">(em units)</span></td></tr>'+
					'<tr><td>Right Side Bearing: </td><td><input type="number" value="'+ps.defaultrsb+'" onchange="_GP.projectsettings.defaultrsb = Math.abs(parseInt(this.value)) || 0;"></td><td><span class="unit">(em units)</span></td></tr>'+
					'</table>';

		// GLYPHS
		content += '<h1>Glyph Ranges</h1>'+
					'Glyph ranges are based on the <a href="http://en.wikipedia.org/wiki/Unicode" target="_blank">Unicode Standard</a>, '+
					'which assigns a <a href="http://en.wikipedia.org/wiki/Hexadecimal" target="_blank">hexadecimal number</a> '+
					'to all possible glyphs in a font. '+
					'<a href="https://en.wikipedia.org/wiki/Unicode_block" target="_blank">Wikipedia"s Unicode Block page</a> ' +
					'is a good place to get familiar with all the different glyphs it\'s possible to have in a font.'+
					'<div class="effect">'+
						'<b>Removing or un-checking a range</b> will not delete glyph data from your Glyphr Studio Project. '+
						'Selected ranges only determine what is shown in the UI, and what is exported to fonts.'+
					'</div>';

		content += '<h2>Standard Glyph Ranges</h2>'+
					'The most common glyph sets are built into Glyphr Studio, and can be toggled with the checkboxes below.';

		content += '<table class="settingstable"><tr>'+
					'<td class="uicolumn">'+checkUI('_GP.projectsettings.glyphrange.basiclatin', ps.glyphrange.basiclatin, false, false, 'activeRangesChanged')+'</td>'+
					'<td><label for="basiclatin"><b>Basic Latin</b> - Unicode glyphs <pre>0x0020</pre> through <pre>0x007E</pre></label></td></tr>'+
					'<tr><td>&nbsp;</td><td colspan="2"><div class="glyphrangepreview">';
					var bl = _UI.basiclatinorder;
					for(var t=0; t<bl.length; t++){ content += makeRangePreviewGlyph(bl[t]*1); }
		content += '</div></td></tr></table>';

		content += '<table class="settingstable"><tr>'+
					'<td class="uicolumn">'+checkUI('_GP.projectsettings.glyphrange.latinsupplement', ps.glyphrange.latinsupplement, false, false, 'activeRangesChanged')+'</td>'+
					'<td><label for="latinsupplement"><b>Latin Supplement</b> - Unicode glyphs <pre>0x00A0</pre> through <pre>0x00FF</pre></label></td></tr>'+
					'<tr><td>&nbsp;</td><td colspan="2"><div class="glyphrangepreview">'+
					makeRangePreview(_UI.glyphrange.latinsupplement) +
					'</div></td></tr></table>';

		content += '<table class="settingstable"><tr>'+
					'<td class="uicolumn">'+checkUI('_GP.projectsettings.glyphrange.latinextendeda', ps.glyphrange.latinextendeda, false, false, 'activeRangesChanged')+'</td>'+
					'<td><label for="latinextendeda"><b>Latin Extended-A</b> - Unicode glyphs <pre>0x0100</pre> through <pre>0x017F</pre></label></td></tr>'+
					'<tr><td>&nbsp;</td><td colspan="2"><div class="glyphrangepreview">'+
					makeRangePreview(_UI.glyphrange.latinextendeda) +
					'</div></td></tr></table>';

		content += '<table class="settingstable"><tr>'+
					'<td class="uicolumn">'+checkUI('_GP.projectsettings.glyphrange.latinextendedb', ps.glyphrange.latinextendedb, false, false, 'activeRangesChanged')+'</td>'+
					'<td><label for="latinextendedb"><b>Latin Extended-B</b> - Unicode glyphs <pre>0x0180</pre> through <pre>0x024F</pre></label></td></tr>'+
					'<tr><td>&nbsp;</td><td colspan="2"><div class="glyphrangepreview">'+
					makeRangePreview(_UI.glyphrange.latinextendedb) +
					'</div></td></tr></table>';

		content += '<h2>Additional Glyph Ranges</h2>'+
					'You can add and edit custom glyph ranges below, or you can '+
					'<span class="textaction" onclick="showGlyphRangeChooser();">launch the Glyph Range Chooser</span> '+
					'to browse all the ranges in Unicode.  '+
					'Custom ranges are inclusive, and must be above <pre>0x0250</pre> and below <pre>0xFFFF</pre>.'+
					'<h3>Add a custom range</h3>'+
					'<table class="settingstable addcustomrange"><tr>'+
						'<td>name:<br><input type="text" id="customrangename"></td>'+
						'<td>begin:<br><input type="text" id="customrangebegin"></td>'+
						'<td>end:<br><input type="text" id="customrangeend"></td>'+
						'<td style="vertical-align:bottom;">'+
						'<button onclick="addCustomGlyphRange();">Add Range</button>'+ helpUI(unicodeInputHelp()) + '</td>'+
					'</tr></table>'+
					'<h3>Glyph ranges</h3>'+
					'<div id="customrangetable"></div>';
					
		// METADATA
		content += '<h1>Font Metadata</h1>';

		content += '<table class="settingstable metadatatable">';
		for(var m in meta){ if(meta.hasOwnProperty(m) && m!== 'font_family'){
			if(meta[m] === '{{sectionbreak}}'){
				content += '<tr><td colspan="3"><p style="margin-bottom:10px;">';
				if(m === 'shared'){
					content += '<h2>Shared</h2>';
					content += 'These properties are shared between OTF and SVG font file formats.';
				} else if (m === 'otf'){
					content += '<h2>OTF</h2>';
					content += 'These properties will be saved with Open Type files when they are exported.';
				} else if (m === 'svg'){
					content += '<h2>SVG</h2>';
					content += 'These properties are based on the CSS @font-face standard.  More information can be found at the W3C\'s <a href=\'http://www.w3.org/TR/CSS2/fonts.html\' target=\'_blank\'>Fonts Page</a> and their <a href=\'http://www.w3.org/TR/2008/REC-CSS2-20080411/fonts.html#select\' target=\'_blank\'>CSS @font-face Page</a>.';
				}
				content += '</p></td></tr>';
			} else {
				meta[m] = meta[m] || '""';
				content += '<tr>';
				content += '<td class="propname" style="padding-top:8px;">' + m.replace(/_/g, '-') + '</td>';
				content += '<td><input type="text" value="'+escapeHTMLValues(meta[m])+'" onchange="_GP.metadata.'+m+' = removeEmptyStringInputs(this.value);"/></td>';
				content += '<td class="prophelp" style="padding-top:8px;">'+_UI.metadatahelp[m]+'</td>';
				content += '</tr>';
			}
		}}
		content += '</table>';


		// Finish and show table
		content += '</div>';
		getEditDocument().getElementById('mainwrapper').innerHTML = content;
		updateCustomRangeTable();
	}
	

	// --------------------------------------------------------------
	// Editing custom ranges
	// --------------------------------------------------------------

	function addCustomGlyphRange(newrange){
		var ranges = _GP.projectsettings.glyphrange;

		if(!newrange) newrange = getCustomRange(true);
		
		if(newrange){
			// Check to see if it's already added
			for(var r=0; r<ranges.custom.length; r++){
				if(ranges.custom[r].begin === newrange.begin &&
					ranges.custom[r].end === newrange.end){
						showToast('Range has already been added:<br>'+newrange.name);
						return;
					}
			}

			// Add and sort
			ranges.custom.unshift(newrange);
			ranges.custom.sort(function(a, b) {
				return (parseInt(a.begin) > parseInt(b.begin));
			});

			if(!(ranges.basiclatin || ranges.latinextendeda || ranges.latinextendedb || ranges.latinsupplement)) activeRangesChanged();
				
			// Update UI
			showToast('Added range:<br>'+newrange.name);
			if(document.getElementById('customrangetable')) updateCustomRangeTable();
			if(document.getElementById('glyphchooser')) redraw({calledby:'addCustomGlyphRange', redrawcanvas:false});
			if(document.getElementById('unicoderangepreviewarea')) previewGlyphRange(newrange);
		}
	}

	function getCustomRange(filterbasicrange, dontclearinputs) {
		// debug(`\n getCustomRange - START`);		
		var newrange = {'begin':0, 'end':0, 'name':'Glyph Range'};
		
		if(document.getElementById('customrangename')) newrange.name = escapeHTMLValues(document.getElementById('customrangename').value);
		newrange.begin = parseUnicodeInput(document.getElementById('customrangebegin').value)[0];
		newrange.end = parseUnicodeInput(document.getElementById('customrangeend').value)[0];

		// debug(`\t newrange read from inputs: ${newrange.begin} - end: ${newrange.end}`);

		// Check input values
		if(isNaN(newrange.begin)){
			showToast('Invalid range input:<br>range begin');
			return false;
		}
		
		if(isNaN(newrange.end)){
			showToast('Invalid range input:<br>range end');
			return false;
		}

		if(filterbasicrange &&
			newrange.begin < _UI.glyphrange.latinextendedb.end &&
			newrange.end < _UI.glyphrange.latinextendedb.end) {
			showToast('Invalid range input:<br>range must be above 0x0250');
			return false;
		}

		// flip
		if(newrange.begin > newrange.end){
			var tempbegin = newrange.begin;
			newrange.begin = newrange.end;
			newrange.end = tempbegin;
		}
		
		// maxes
		if(filterbasicrange){
			newrange.begin = Math.max(newrange.begin, (_UI.glyphrange.latinextendedb.end+1));
			newrange.end = Math.max(newrange.end, (_UI.glyphrange.latinextendedb.end+2));
		}
		newrange.begin = Math.min(newrange.begin, 0xFFFE);
		newrange.end = Math.min(newrange.end, 0xFFFF);
		
		// format
		newrange.name = newrange.name || ('Glyph Range ' + (_GP.projectsettings.glyphrange.custom.length + 1));
		newrange.begin = decToHex(newrange.begin);
		newrange.end = decToHex(newrange.end);
			
		// Clear out inputs
		if(!dontclearinputs) {
			if(document.getElementById('customrangename')) document.getElementById('customrangename').value = '';
			document.getElementById('customrangebegin').value = '';
			document.getElementById('customrangeend').value = '';
		}
	
		// debug(` getCustomRange - END\n\n`);
		return newrange;

	}
	
	function updateCustomRangeTable(){
		var cr = _GP.projectsettings.glyphrange.custom;
		//debug('UPDATECUSTOMRANGETABLE - \n\t custom is ' + JSON.stringify(cr));
		var content = '';
		content += '<table class="customrangegrid">';
		content += '<tr>'+
					'<td class="customrangegridheader">range name</td>'+
					'<td class="customrangegridheader">begin</td>'+
					'<td class="customrangegridheader">end</td>'+
					'<td class="customrangegridheader">&nbsp;</td>'+
					'</tr>';
		if(cr.length){
			for(var c=0; c<cr.length; c++){
				if(!cr[c].name) cr[c].name = ('Glyph Range ' + (c+1));
				content += '<tr><td>';
				content += cr[c].name;
				content += '</td><td>';
				content += cr[c].begin;
				content += '</td><td>';
				content += cr[c].end;
				content += '</td><td style="width: 100px; text-align: center;">';
				content += '<span class="textaction" onclick="removeCustomGlyphRange('+c+');">remove</span>';
				content += '&emsp;';
				content += '<span class="textaction" onclick="editCustomGlyphRange('+c+');">edit</span>';
				content += '</td></tr>';
			}
		} else {
			content += '<tr><td colspan="4"><i style="opacity: 0.5">No custom ranges have been added</i></td></tr>';
		}
		content += '</table><br>';
		document.getElementById('customrangetable').innerHTML = content;
	}

	function removeCustomGlyphRange(i) {
		var cr = _GP.projectsettings.glyphrange.custom;
		//debug('REMOVECUSTOMGLYPHRANGE - called on index ' + i + '\n\t custom is ' + JSON.stringify(cr));
		cr.splice(i,1);
		updateCustomRangeTable();
		//debug('REMOVECUSTOMGLYPHRANGE - \n\t custom is ' + JSON.stringify(cr));
	}
	
	function editCustomGlyphRange(i) {
		var cr = _GP.projectsettings.glyphrange.custom;
		document.getElementById('customrangename').value = cr[i].name;
		document.getElementById('customrangebegin').value = cr[i].begin;
		document.getElementById('customrangeend').value = cr[i].end;
		
		removeCustomGlyphRange(i);
	}
	
	function getFirstActiveRange() {
		if(_GP.projectsettings.glyphrange.basiclatin) return 'basiclatin';
		if(_GP.projectsettings.glyphrange.latinsupplement) return 'latinsupplement';
		if(_GP.projectsettings.glyphrange.latinextendeda) return 'latinextendeda';
		if(_GP.projectsettings.glyphrange.latinextendedb) return 'latinextendedb';
		// zero is the first custom range
		if(_GP.projectsettings.glyphrange.custom.length) return 0;
		
		return false;
	}

	function activeRangesChanged(){
		_UI.glyphchooser.panel.selected = getFirstActiveRange();
	}

	function showGlyphRangeChooser() {
		var content = '<h1>Add additional glyph ranges</h1>';
		content += '<div id="unicoderangepreviewarea"><h2>preview</h2><div class="glyphrangepreview">';
		content += 'Select glyph range from the right to preview it here.<br><br>';
		content += 'These are only advanced glyph ranges, standard Latin ranges can be added or removed from Font Settings.</div></div>';
		var chooserContent = '<table class="customrangegrid" style="width: 100%;">';
		chooserContent += '<tr>'+
		'<td class="customrangegridheader" style="width: 230px;">range name</td>'+
		'<td class="customrangegridheader">begin</td>'+
		'<td class="customrangegridheader">end</td>'+
		'<td class="customrangegridheader">&nbsp;</td>'+
		'</tr>';
		
		// blocks 0-3 are basic latin ranges enabled by checkboxes
		var block;
		for(var b=4; b<_UI.unicodeBlocks.length; b++) {
			block = _UI.unicodeBlocks[b];
			if(!block.name) block.name = ('Glyph Range ' + (b+1));
			chooserContent += '<tr><td>';
			chooserContent += block.name;
			chooserContent += '</td><td>';
			chooserContent += decToHex(block.begin);
			chooserContent += '</td><td>';
			chooserContent += decToHex(block.end);
			chooserContent += '</td><td style="width: 100px; text-align: center;">';
			chooserContent += '<span class="textaction" onclick="previewGlyphRange({begin:'+decToHex(block.begin)+', end:'+decToHex(block.end)+', name:\''+block.name+'\'});">preview</span>';
			chooserContent += '&emsp;';
			chooserContent += '<span class="textaction" onclick="addCustomGlyphRange({begin:\''+decToHex(block.begin)+'\', end:\''+decToHex(block.end)+'\', name:\''+block.name+'\'});">add</span>';
			chooserContent += '</td></tr>';
		}

		chooserContent += '</table>';
		openBigDialog(content, chooserContent);
	}
	
	function previewGlyphRange(range) {
		var content = '<h2>'+range.name+'</h2>';
		content += '<div class="glyphrangepreview">';
		content += makeRangePreview(range);
		content += '</div>';
		content += '<button class="buttonsel" onclick="addCustomGlyphRange({begin:\''+decToHex(range.begin)+'\', end:\''+decToHex(range.end)+'\', name:\''+range.name+'\'});">Add</button>';

		document.getElementById('unicoderangepreviewarea').innerHTML = content;
	}

	// --------------------------------------------------------------
	// Input handling
	// --------------------------------------------------------------
	
	
	function removeEmptyStringInputs(val) {
		if(val === '""' || val === "''") return '';
		else return trim(val);
	}

	function escapeHTMLValues(val){
		// debug('\n escapeHTMLValues - START');
		// debug('\t typeof val = ' + typeof val);
		// debug(val);

		if(typeof val === 'string'){
			if(val === '""' || val === "''") return '';
			
			if(val.indexOf('"') > -1) {
				// debug('\t replacing double quotes');
				val = val.replace(/"/g, '&quot;');
			}
			
			if(val.indexOf('<') > -1) {
				// debug('\t replacing less than');
				val = val.replace(/</g, '&lt;');
			}
			
			if(val.indexOf('>') > -1) {
				// debug('\t replacing greater than');
				val = val.replace(/>/g, '&gt;');
			}
		}

		// debug('\t returning ' + JSON.stringify(val));
		return val;
	}

	function makeRangePreview(range) {
		var content = '';
		
		for(var g = range.begin; g <= range.end; g++) {
			content += makeRangePreviewGlyph(g);
		}

		return content;
	}
	
	function makeRangePreviewGlyph(g) {
		var hexString = decToHex(g);
		var content = '<span class="glyphrangepreviewglyph" title="' + hexString;
		var name = getUnicodeName(hexString);
		if(name) content += '\n' + escapeHTMLValues(name);
		content += '">';
		content += hexToChars(g);
		content += '</span>';
		
		return content;
	}

// end of file // start of file
/**
	Page > Ligatures
	HTML and associated functions for this page.
**/


	function loadPage_ligatures(){
		// debug('\n loadPage_ligatures - START');

		getEditDocument().getElementById('mainwrapper').innerHTML = editPage_Content();
		setupEditCanvas();
		initEventHandlers();
		clickEmptySpace();
		
		if(_UI.devmode && isval(_UI.dev_selected_shape)){
			selectShape(_UI.dev_selected_shape);
			_UI.dev_selected_shape = false;
		}

		_UI.selectedligature = _UI.selectedligature || getFirstID(_GP.ligatures);
		
		if(getSelectedWorkItemShapes().length > 0)	_UI.selectedtool = 'pathedit';
		else _UI.selectedtool = 'pathaddpoint';

		redraw({calledby:'loadPage_ligatures'});
	}

	function showNewLigatureDialog() {
		var con = '<h1>New Ligature</h1>';
		con += '<div style="width:500px;">';
		con += 'Create a new ligature by specifying two or more individual glyphs that will make up the ligature (like ff).<br><br>';
		con += 'Ligature glyphs can also be specified in Unicode format (like <pre>U+0066U+0066</pre>) or hexadecimal format (like <pre>0x00660x0066</pre>). ';
		con += 'Hexadecimal, Unicode, and regular glyph formats cannot be mixed - choose one type!<br><br>';
		con += '<h3>Ligature Glyphs</h3>';
		con += '<input type="text" id="newligatureinput" style="font-size:24px; padding:8px;"/><br>';
		con += makeErrorMessageBox();
		con += '<br>';
		con += '<button class="buttonsel" onclick="createNewLigature();">create new ligature</button>';
		con += '</div>';

		openDialog(con);
	}

	function createNewLigature() {
		// debug('\n createNewLigature - START');
		var inlig = document.getElementById('newligatureinput').value;
		// debug('\t retrieved ' + lid);
		var lid = inlig.replace(/\s/gi, '');
		lid = parseUnicodeInput(lid);
		if(lid) lid = lid.join('');
		else {
			showErrorMessageBox('Ligatures must be at least two glyphs.');
			return;
		}


		// debug('\t parsed ' + lid);

		var lig = _GP.ligatures;

		if(lig[lid]){
			showErrorMessageBox('Ligature allready exists.');
		} else if (lig === false || lid.length < 2){
			showErrorMessageBox('Ligatures must be at least two glyphs.');
		} else {
			lig[lid] = new Glyph({'glyphhex':lid, 'name':('Ligature ' + inlig)});
			sortLigatures();
			_UI.selectedligature = lid;
			history_put('Created ' + getSelectedWorkItemName());
			navigate();
			closeDialog();
		}
	}

	var ligaturesWithCodePoints = [
		{chars: 'f‌f', point: '0xFB00'},
		{chars: 'f‌i', point: '0xFB01'},
		{chars: 'f‌l', point: '0xFB02'},
		{chars: 'f‌f‌i', point: '0xFB03'},
		{chars: 'f‌f‌l', point: '0xFB04'},
		{chars: 'st', point: '0xFB06'},
		{chars: 'AE', point:'0x00C6'},
		{chars: 'ae', point:'0x00E6'},
		{chars: 'OE', point: '0x0152'},
		{chars: 'oe', point: '0x0153'}
	];

	function doesLigatureHaveCodePoint(id) {
		// debug('\n doesLigatureHaveCodePoint - START');
		// debug('\t passed ' + id);

		if(id.indexOf('0x', 2) === -1) return false;

		var ch = hexToChars(id);

		for(var i=0; i<ligaturesWithCodePoints.length; i++){
			if(ligaturesWithCodePoints[i].chars === ch) return ligaturesWithCodePoints[i];
		}

		return false;
	}

	function addCommonLigatures() {
		var lig, id;
		for(var i=0; i<ligaturesWithCodePoints.length; i++){
			lig = ligaturesWithCodePoints[i];
			id = parseUnicodeInput(lig.chars).join('');
			if(!_GP.ligatures[id]) _GP.ligatures[id] = new Glyph({'glyphhex':id});
		}

		_UI.selectedglyph = getFirstID(_GP.ligatures);
		redraw({calledby:'addCommonLigatures'});
	}

	function deleteLigatureConfirm(){
		var content = '<h1>Delete Ligature</h1>';
		content += '<b style="color:'+_UI.colors.error.medium+';">This action cannot be undone!</b> &nbsp; Are you sure you want to delete this Ligature?<br><br>';
		
		var uia = getSelectedWorkItem().usedin;
		if(uia.length > 0){
			content += 'This Ligature is linked to the following Glyphs as a Component Instance:<br><ul>';

			for(var ssu=0; ssu<uia.length; ssu++){
				content += ('<li>' + getGlyphName(uia[ssu]).replace(/LATIN /gi,'') + '</li>');
			}

			content += '</ul>';
			// content += '<br>The Component Instances in these Glyphs will also be deleted.<br><br>';
		}

		content += '<br><br><button class="buttonsel" onclick="deleteLigature();">delete this ligature</button> &nbsp; <button onclick="closeDialog();">cancel</button>';

		openDialog(content);
	}

	function deleteLigature(){
		// debug('\n deleteLigature - START');
		// debug('\t deleting ' + _UI.selectedligature);

		closeDialog();

		// Delete upstream Component Instances
		getSelectedWorkItem().deleteLinks(_UI.selectedligature);
		
		// Delete it
		var oldname = getSelectedWorkItemName();
		delete _GP.ligatures[_UI.selectedligature];
		_UI.selectedligature = getFirstID(_GP.ligatures);

		// history_put('Deleted ' + oldname);

		// debug('\t after delete ' + _GP.ligatures);
		redraw({calledby:'deleteLigature'});

		// debug('deleteLigature - END\n');
	}

	function sortLigatures() {
		var temp;
		var sortarr = [];

		for(var n in _GP.ligatures) { if(_GP.ligatures.hasOwnProperty(n)){
			temp = _GP.ligatures[n];
			sortarr.push({'id':n, 'ligature':temp});
		}}

		sortarr.sort(function(a,b){
			if(a.id && b.id){
				if(a.id.length === b.id.length){
					if (a.id > b.id) return 1;
					if (a.id < b.id) return -1;
				} else {
					return b.id.length - a.id.length;
				}
			} else return 0;
		});

		_GP.ligatures = {};

		for(var s=0; s<sortarr.length; s++){
			temp = sortarr[s];
			_GP.ligatures[temp.id] = temp.ligature;
		}

		return sortarr;
	}

// end of file// start of file
/**
	History
	An object that stores a Glyphr Studio Project
	state, to enable undo.  History is saved per
	page... essentially, each page gets it's own
	undo queue.
**/


	function History(pn) {
		this.queue = [];
		this.parentname = pn;
		this.currstate = clone(_GP[this.parentname]);
		this.initialstate = clone(_GP[this.parentname]);
		this.initialdate = new Date().getTime();
	}

	History.prototype.put = function(des) {
		// debug('\n History.put - START');

		this.queue.push({
			'name': getSelectedWorkItemName(),
			'id': getSelectedWorkItemID(),
			'description': des,
			'date': new Date().getTime(),
			'state': clone(this.currstate)
		});

		this.currstate = clone(_GP[this.parentname]);

		setProjectAsUnsaved();
		markSelectedWorkItemAsChanged();

		// debug(' History.put - END\n');
	};

	History.prototype.pull = function() {
		// debug('\n History.pull - START');
		// debug('\t queue.length ' + this.queue.length);

		if(this.queue.length === 0) return;

		var currentID = getSelectedWorkItemID();
		var nextID = this.queue[this.queue.length-1].id;

		if(currentID === nextID){
			var top = this.queue.length? this.queue.pop().state : this.initialstate;

			if(this.parentname === 'kerning') hydrateGlyphrObjectList(HKern, clone(top), _GP[kerning]);
			else hydrateGlyphrObjectList(Glyph, clone(top), _GP[this.parentname]);

			this.currstate = clone(top);
			
			var selwi = getSelectedWorkItem();
			if(selwi && selwi.changed) selwi.changed(true, true);

		} else {
			// If the next undo item is a different glyph, 
			// navigate to that glyph before undo-ing
			showToast('Navigated without undo-ing.<br>Undo again to roll back changes for this glyph.', 2000);
			selectGlyph(nextID);
		}


		if (_UI.current_page === 'import svg'){
			update_NavPanels();

		} else if (_UI.current_page === 'components'){
			if(!_GP.components[_UI.selectedcomponent]){
				_UI.selectedcomponent = getFirstID(_GP.components);
			}
		} else if (_UI.current_page === 'ligatures'){
			if(!_GP.ligatures[_UI.selectedligature]){
				_UI.selectedligature = getFirstID(_GP.ligatures);
			}
		}

		_UI.ms.shapes.clear();
		_UI.ms.points.clear();
		// update_NavPanels();
		redraw({calledby:'history_pull', redrawpanels: true});


		// debug('\t after redraw');

		var empty = true;
		for (var q in _UI.history) {
			if (_UI.history.hasOwnProperty(q) && _UI.history[q].queue.length) {
					empty = false;
					break;
			}
		}
		if (empty) setProjectAsSaved();


		// debug(' History.pull - END\n');
	};

	// Global Accessor Functions
	function history_put(dsc){
		if(onCanvasEditPage()){
			var queue = _UI.current_page === 'import svg'? 'glyph edit' : _UI.current_page;
			_UI.history[queue].put(dsc);
		}
	}

	function history_pull(){
		if(onCanvasEditPage()){
			closeDialog();
			closeNotation();
			_UI.history[_UI.current_page].pull();
		}
	}

	function history_length() {
		if(onCanvasEditPage()){
			return _UI.history[_UI.current_page].queue.length || 0;
		}

		return 0;
	}

// end of file// start of file
/**
	Framework > Edit Canvas
	The Glyph Edit, Components, Ligatures, and to
	a certain extent, Kerning pages use a common
	HTML5 Canvas mechanism for interaction.
	Common functions around this can be found here.
**/


//-------------------
// Common Edit Page
//-------------------

	function editPage_Content(){
		return ''+
			"<div id='notation'>&#x20E2;</div>" +
			"<canvas id='glypheditcanvas' width=12 height=12 ></canvas>" +
			"<div id='toolsarea_upperleft' onmouseover='mouseovercec();'> (ノ°□°)ノ︵ ┻━┻ </div>" +
			"<div id='toolsarea_upperright'>&nbsp;</div>" +
			"<div id='toolsarea_lowerleft'>&nbsp;</div>" +
			makeFloatLogo();
	}

//-------------------
// REDRAW
//-------------------
	/*
		redraw
		This can be called globally to trigger a redraw of whatever page is currently active.
		It takes an optional 'calledby' variable, which is any string to identify what triggered
		the redraw, for debugging purposes.
	*/
	function redraw(oa){
		// debug('\n REDRAW - START');
		// debug('\t oa: ' + json(oa));
		oa = oa || {};
		_UI.redraw.redrawcanvas = isval(oa.redrawcanvas) ? oa.redrawcanvas : true;
		_UI.redraw.redrawtools = isval(oa.redrawtools) ? oa.redrawtools : true;
		_UI.redraw.redrawpanels = isval(oa.redrawpanels) ? oa.redrawpanels : true;
		_UI.redraw.calledby = oa.calledby || '';

		if(!_UI.redraw.redrawpanels && document.getElementById('navarea_panel') && document.getElementById('navarea_panel').innerHTML === '') _UI.redraw.redrawpanels = true;

		if(_UI.redrawing){
			// this is totally a hack
			// debug('\t RETURNING because _UI.redrawing = ' + _UI.redrawing);
			return;
		}

		_UI.redrawing = false;
		reqAniFrame(redrawUnit);
		_UI.redrawing = false;
		// debug(' REDRAW - END\n');
	}

	function redrawUnit() {
		// debug('\n redrawUnit - START');
		// debug('\t _UI.redraw ' + json(_UI.redraw));

		if(_UI.redraw.redrawcanvas){
			if(_UI.glypheditctx) _UI.glypheditctx.clearRect(0,0,_UI.glypheditcanvassize,_UI.glypheditcanvassize);

			switch (_UI.current_page){
				case 'glyph edit': redraw_GlyphEdit(); break;
				case 'components': redraw_GlyphEdit(); break;
				case 'ligatures': redraw_GlyphEdit(); break;
				case 'kerning': redraw_Kerning(); break;
				case 'test drive': redraw_TestDrive(); break;
			}
		}

		if(!_UI.eventhandlers.currtool.dragging) update_ToolsArea();

		if(_UI.redraw.redrawpanels) update_NavPanels();

		if(_UI.focuselement) {
			var fe = document.getElementById(_UI.focuselement);
			// if(fe) fe.select();
			if(fe) {
				// var l = fe.value.length;
				// fe.selectionStart = l;
				// fe.selectionEnd = l;
				fe.focus();
			}
		}
		_UI.focuselement = false;

		if(!_UI.contextglyphs.string) updateContextGlyphs();

		if(_UI.devmode && _UI.testOnRedraw) _UI.testOnRedraw();
		//debug(' redrawUnit - END\n');
	}


//-------------------
// Update Tools
//-------------------
	function update_ToolsArea(){
		// debug('\n update_ToolsArea - START');

		if(!onCanvasEditPage()){
			// debug('\t returning, !onCanvasEditPage');
			return;
		}

		if(!_UI.redraw.redrawtools){
			// debug('\t returning, !_UI.redraw.redrawtools');
			return;
		}

		if(!getSelectedWorkItemID()){
			// debug('\t returning, !getSelectedWorkItemID');
			getEditDocument().getElementById("toolsarea_upperleft").innerHTML = '';
			return;
		}

		var patheditclass = '';
		var pathaddpointclass = '';
		var penclickable = true;
		var penaddpointclickable = true;
		var onglyph = (_UI.current_page === 'glyph edit');
		var oncom = (_UI.current_page === 'components');
		var onlig = (_UI.current_page === 'ligatures');
		var onkern = (_UI.current_page === 'kerning');
		var type = _UI.ms.shapes.getType();
		var selectedWorkItem = getSelectedWorkItem();

		if(_UI.selectedtool === 'pathedit'){
			patheditclass = 'buttonsel';
		} else if (type === 'componentinstance'){
			patheditclass = 'buttondis';
			penclickable = false;
			penaddpointclickable = false;
		}

		if(_UI.selectedtool === 'pathaddpoint'){
			pathaddpointclass = 'buttonsel';
		} else if (type === 'componentinstance'){
			pathaddpointclass = 'buttondis';
			penclickable = false;
			penaddpointclickable = false;
		}

		if(_UI.ms.shapes.count() > 1){
			pathaddpointclass = 'buttondis';
			penaddpointclickable = false;
		}

		var st = _UI.selectedtool;

		// debug(`\t selected glyph ${selectedWorkItem.name} selected tool ${st}`);

		// UPPER RIGHT
		// Pop In/Out
		var pop = '';
		if(onCanvasEditPage()){
			pop += '<span style="width:15px; display:inline-block;">&nbsp;</span>';
			if(_UI.popout){
				pop += '<button title="one screen mode" class="tool" onclick="popIn();">'+makeToolButton({'name':'tool_popIn'})+'</button>';
			} else {
				pop += '<button title="two screen mode" class="tool" onclick="popOut();">'+makeToolButton({'name':'tool_popOut'})+'</button>';
			}
		}

		var zoom = '';
		// Pan
		zoom += '<button title="scroll and pan" class="' + (st==='pan'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'pan\');"/>'+makeToolButton({'name':'tool_pan', 'selected':(st==='pan')})+'</button>';
		zoom += '<span style="width:15px; display:inline-block;">&nbsp;</span>';
		// Zoom
		zoom += '<button title="zoom: one to one" class="tool" onclick="setView({dz:1});redraw({calledby:\'updatetools\'});">'+makeToolButton({'name':'tool_zoom1to1'})+'</button>';
		zoom += '<button title="zoom: fit to screen" class="tool" onclick="fitViewToContextGlyphs(); redraw({calledby:\'updatetools\'});">'+makeToolButton({'name':'tool_zoomEm'})+'</button>';
		zoom += '<input type="number" title="zoom level" class="zoomreadout" value="' + round(getView('updatetools').dz*100, 2) + '" onchange="setViewZoom(this.value);"/>';
		zoom += '<button title="zoom: out" class="tool" onclick="viewZoom(.9, true);">'+makeToolButton({'name':'tool_zoomOut'})+'</button>';
		zoom += '<button title="zoom: in" class="tool" onclick="viewZoom(1.1, true);">'+makeToolButton({'name':'tool_zoomIn'})+'</button>';


		// UPPER LEFT
		// New Shape
		var newshape = '';
		newshape += '<button onmouseover="mouseovercec();" title="new rectangle shape" class="' + (st==='newrect'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'newrect\');"/>'+makeToolButton({'name':'tool_newRect', 'selected':(st==='newrect')})+'</button>';
		newshape += '<button onmouseover="mouseovercec();" title="new oval shape" class="' + (st==='newoval'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'newoval\');"/>'+makeToolButton({'name':'tool_newOval', 'selected':(st==='newoval')})+'</button>';
		newshape += '<button onmouseover="mouseovercec();" title="new path shape" class="' + (st==='newpath'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'newpath\');"/>'+makeToolButton({'name':'tool_newPath', 'selected':(st==='newpath')})+'</button>';
		newshape += '<br>';

		// Path and Shape Edit
		var edittools = '';
		edittools += '<button onmouseover="mouseovercec();" title="add path point" class="' + pathaddpointclass + ' tool" ' + (penaddpointclickable? 'onclick="clickTool(\'pathaddpoint\');"':'') + '/>'+makeToolButton({'name':'tool_penPlus', 'selected':(st==='pathaddpoint'), 'disabled':!penaddpointclickable})+'</button>';
		edittools += '<button onmouseover="mouseovercec();" title="path edit" class="' + patheditclass + ' tool" ' + (penclickable? 'onclick="clickTool(\'pathedit\');"':'') + "/>"+makeToolButton({'name':'tool_pen', 'selected':(st==='pathedit'), 'disabled':!penclickable})+'</button>';
		edittools += '<button onmouseover="mouseovercec();" title="shape edit" class="' + (st==='shaperesize'? 'buttonsel ' : " ") + 'tool" onclick="clickTool(\'shaperesize\');"/>'+makeToolButton({'name':'tool_arrow', 'selected':(st==='shaperesize')})+'</button>';
		edittools += '<br>';

		var donepath = '<div style="height:5px;">&nbsp;</div>';
		donepath += '<button class="buttonsel" style="width:94px; font-size:.8em; padding:2px;" title="done editing path" onclick="clickTool(\'pathedit\');">done editing path</button>';

		// Slice
		// var slice = '<button title="slice" class="' + (st==='slice'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'slice\');"/>'+makeToolButton({'name':'tool_slice', 'selected':(st==='slice')})+'</button>';

		// Kern
		var kern = '<button title="kern" class="' + (st==='kern'? 'buttonsel ' : ' ') + 'tool" onclick="clickTool(\'kern\');"/>'+makeToolButton({'name':'tool_kern', 'selected':(st==='kern')})+'</button>';

		// Context Glyphs
		var ctxg = '<div class="contextglyphsarea">';
		ctxg += '<div id="contextglyphsoptions">';
		ctxg += '<b>Context Glyphs</b> are letters you can display around the glyph you are currently editing.<br><br>';
		ctxg += checkUI('_GP.projectsettings.showcontextglyphguides', _GP.projectsettings.showcontextglyphguides, true);
		ctxg += '<label style="margin-left:10px; position:relative; top:-6px;" for="showcontextglyphguides">show guides</label><br>';
		ctxg += 'glyph ' + sliderUI('contextglyphtransparency', 'contextglyphtransparency_dropdown', true, false);
		ctxg += '<br/>';
		ctxg += 'guide ' + sliderUI('systemguidetransparency', 'systemguidetransparency_dropdown', true, false);
		ctxg += '</div>';
		ctxg += '<input type="text" id="contextglyphsinput" oninput="updateContextGlyphs();" ';
		ctxg += 'onblur="_UI.focuselement = false;" onmouseover="mouseoutcec();" ';
		ctxg += 'title="context glyphs\ndisplay glyphs before or after the currently-selected glyph" ';
		ctxg += 'value="'+getContextGlyphString()+'"/>';
		ctxg += '<button id="contextglyphsoptionsbutton" onclick="showCtxGlyphsOptions();">&#x23F7;</button>';
		ctxg += '</div>';

		// LOWER LEFT
		// Keyboard Tips Button
		var kbt = '<button title="keyboard and mouse tips" onclick="toggleKeyboardTips();" id="keyboardtips">'+makeIcon({'name':'keyboard', 'size':50, 'width':30, 'height':30, 'color':'rgb(229,234,239)'})+'</button>';



		//
		// Put it all together
		//

		var toolcontent = '';
		var viewcontent = '';
		var utilitiescontent = '';

		viewcontent += zoom;
		viewcontent += pop;

		if(onglyph || onlig) toolcontent += newshape;
		if(oncom && selectedWorkItem && !selectedWorkItem.shape) toolcontent += newshape;

		if(onglyph || oncom || onlig) {
			toolcontent += edittools;
			if(_UI.selectedtool === 'newpath') toolcontent += donepath;
		}

		if(onkern) toolcontent += kern;
		if(onglyph || onlig) toolcontent += ctxg;

		if(_GP.projectsettings.showkeyboardtipsicon) utilitiescontent += kbt;

		getEditDocument().getElementById("toolsarea_upperleft").innerHTML = toolcontent;
		getEditDocument().getElementById("toolsarea_upperright").innerHTML = viewcontent;
		getEditDocument().getElementById("toolsarea_lowerleft").innerHTML = utilitiescontent;

		// debug(' update_ToolsArea - END\n');
	}

	function clickTool(ctool){
		// debug('\n clickTool - START');
		_UI.selectedtool = ctool;

		// debug('\t passed: ' + ctool + ' and _UI.selectedtool now is: ' + _UI.selectedtool);

		_UI.eventhandlers.eh_addpath.firstpoint = true;
		_UI.eventhandlers.multi = false;

		if(ctool === 'newrect'){
			setCursor('crosshairsSquare');
			clickEmptySpace();
		} else if (ctool === 'newoval'){
			setCursor('crosshairsCircle');
			clickEmptySpace();
		} else if (ctool === 'newpath'){
			setCursor('penPlus');
			clickEmptySpace();
		} else if(ctool === 'pathedit'){
			setCursor('pen');
		} else if(ctool === 'slice'){
			setCursor('slice');
		} else if (ctool === 'shaperesize'){
			setCursor('arrow');
			// _UI.ms.shapes.calcMaxes();
		}

		_UI.eventhandlers.hoverpoint = false;
		closeNotation();
		// updateCursor();

		redraw({calledby:'clicktool', redrawpanels: false});
	}

	function updateCursor(tool){
		tool = tool || _UI.selectedtool;

		// debug('\n updateCursor - START');
		// debug('\t tool = ' + tool);

		if(_UI.eventhandlers.ismouseovercec){
			if(tool === 'newrect'){
				// debug('\t setting cursor to crosshairsSquare');
				setCursor('crosshairsSquare');

			} else if (tool === 'newoval'){
				// debug('\t setting cursor to crosshairsCircle');
				setCursor('crosshairsCircle');

			} else if (tool === 'shaperesize'){
				// debug('\t shaperesize :: not setting cursor');
				// Handled by eventHandler

			} else if (tool === 'newpath'){
				// debug('\t setting cursor to penPlus');
				setCursor('penPlus');

			} else if (tool === 'pathedit'){
				// debug('\t setting cursor to pen');
				setCursor('pen');

			} else if (tool === 'pathaddpoint'){
				// debug('\t setting cursor to pen');
				setCursor('penPlus');

			} else if (tool === 'slice'){
				// debug('\t setting cursor to slice');
				setCursor('slice');

			} else if (tool === 'pan'){
				// debug('\t setting cursor to move');
				setCursor('move');

			} else if (tool === 'kern'){
				// debug('\t setting cursor to col-resize');
				setCursor('col-resize');

			} else {
				// debug('\t defaulting cursor to pointer');
				setCursor('arrow');

			}
		} else {
			// debug('\t NOT ON EDIT CANVS setting cursor to default');
			setCursor('default');
		}

		// debug(' updateCursor - END\n');
	}

	function setCursor(name) {
		// debug('\n setCursor - START');
		// debug('\t passed ' + name);
		var cur = ['auto','default','none','context-menu','help','pointer','progress','wait','cell','crosshair','text','vertical-text','alias','copy','move','no-drop','not-allowed','e-resize','n-resize','ne-resize','nw-resize','s-resize','se-resize','sw-resize','w-resize','ew-resize','ns-resize','nesw-resize','nwse-resize','col-resize','row-resize','all-scroll','zoom-in','zoom-out','grab','grabbing'];

		if(cur.indexOf(name+'-resize') > -1){
			if(canResize(name)) name+='-resize';
			// debug('\t SET -resize CURSOR');
		}

		getEditDocument().body.style.cursor = 'auto';

		if(_UI.cursors[name]){
			getEditDocument().body.style.cursor = _UI.cursors[name];
			// debug('\t SET CUSTOM CURSOR:\t'+name);
		} else if (cur.indexOf(name) > -1) {
			getEditDocument().body.style.cursor = name;
			// debug('\t SET BUILT-IN CURSOR:\t'+name);
		} else {
			// debug('\t DEFAULT TO auto');
		}

		// debug(' setCursor - END\n');
	}

	function getEditMode() {
		var tool = _UI.selectedtool;
		if(tool === 'pan') tool = _UI.eventhandlers.lastTool;

		if(tool === 'newrect' || tool === 'newoval')	return 'newbasicshape';
		else if (tool === 'newpath')	return 'newpath';
		else if (tool === 'shaperesize')	return _UI.eventhandlers.handle === 'rotate'? 'rotate' : 'arrow';
		else if (tool === 'pathedit' || tool === 'pathaddpoint')	return 'pen';
		else if (tool === 'kern')	return 'kern';
	}

	function mouseovercec() {
		// debug('\n mouseovercec - START');
		_UI.eventhandlers.ismouseovercec = true;
		updateCursor();
		if(_UI.hamburger.state !== 0 && _UI.current_panel !== 'npNav') goHamburger(false);
		// debug(' mouseovercec - END\n');
	}

	function mouseoutcec() {
		// debug('\n mouseoutcec - START');
		_UI.eventhandlers.ismouseovercec = false;
		// Fixes a Chrome cursor problem
		document.onselectstart = function () {};
		updateCursor();
		if(_UI.hamburger.state !== 11 && _UI.current_panel !== 'npNav') goHamburger(true);
		// debug(' mouseoutcec - END\n');
	}

	function updateContextGlyphs() {
		var selwi = getSelectedWorkItem();
		var cgi = getEditDocument().getElementById('contextglyphsinput');

		if(cgi){
			selwi.contextglyphs = cgi.value;

			_UI.contextglyphs.string = cgi.value;
			_UI.contextglyphs.advancewidth = getStringAdvanceWidth(cgi.value);
			fitViewToContextGlyphs();

			redraw({calledby: 'updateContextGlyphs', redrawpanels: false, redrawtools:false})
		}
	}

	function getContextGlyphString() {
		return getSelectedWorkItem().contextglyphs || hexToChars(getSelectedWorkItemID());
	}

	function showCtxGlyphsOptions() {
		getEditDocument().getElementById('contextglyphsoptions').style.display = 'block';
		getEditDocument().getElementById('contextglyphsoptionsbutton').onclick = hideCtxGlyphsOptions;
		getEditDocument().getElementById('contextglyphsoptionsbutton').innerHTML = '&#x23F6;';
	}

	function hideCtxGlyphsOptions() {
		getEditDocument().getElementById('contextglyphsoptions').style.display = 'none';
		getEditDocument().getElementById('contextglyphsoptionsbutton').onclick = showCtxGlyphsOptions;
		getEditDocument().getElementById('contextglyphsoptionsbutton').innerHTML = '&#x23F7;';
		getEditDocument().getElementById('contextglyphsinput').focus();
	}

	function toggleKeyboardTips(){

		if(document.getElementById('dialog_box').style.display==='block'){
			closeDialog();
		} else {
			var con = '<h1>Keyboard and Mouse Shortcuts</h1>';

			con += makeKeyboardShortcutsTable();

			con += '<table><tr><td style="vertical-align:top; padding:20px 10px 0px 0px;">'+
				checkUI('_GP.projectsettings.showkeyboardtipsicon', _GP.projectsettings.showkeyboardtipsicon)+
			'</td><td style="vertical-align:top; padding:20px 10px 0px 0px;">'+
				'<label style="position:relative; top:-5px;" for="showkeyboardtipsicon">show the &nbsp;<span style="position:relative; top:6px;">'+makeIcon({'name':'keyboard', 'size':50, 'width':22, 'height':22, 'color':'rgb(76, 81, 86)', 'hovercolor':'rgb(76, 81, 86)'})+'</span>&nbsp; button on the edit canvas</label>'+
			'</td></tr></table>';

			openDialog(con);
		}
	}

	function makeKeyboardShortcutsTable() {
		return `<table style='margin:20px 40px 40px 0px;'>
		<tr><td>

			<br>
			<table>
				<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>s</span></td><td>save a Glyphr Studio Project file</td></tr>
				<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>e</span></td><td>export an Open Type font file</td></tr>
				<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>g</span></td><td>export a SVG font file</td></tr>
			</table>

		</td>
		<td style='padding-left:40px;'>

			<br>
			<table>
			<tr><td class='keycol'><span class='keycallout'>esc</span></td><td>closes any dialog</td></tr>
			<tr><td class='keycol'><span class='keycallout'>?</span></td><td>toggles this shortcuts dialog</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>o</span></td><td>open a new Glyphr Studio Project</td></tr>
			</table>

		</td></tr>
		<tr><td>

			<br>
			<table>
			<tr><td>&nbsp;</td><td><br><h3 style='margin-bottom:8px;'>shapes and paths:</h3></td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>mouse click</span></td><td>multi-select shapes or points</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>c</span></td><td>copy selected shape</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>v</span></td><td>paste shape</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>z</span></td><td>undo</td></tr>
			<tr><td class='keycol'><span class='keycallout' style='margin-bottom:5px;'>backspace</span><br>or <span class='keycallout'>delete</span></td><td>delete selected shape<br>or path point</td></tr>
			<tr><td class='keycol'>
				<span class='arrow'>&#x21E7;</span>
				<span class='arrow'>&#x21E9;</span>
				<span class='arrow'>&#x21E6;</span>
				<span class='arrow' style='margin-right:4px;'>&#x21E8;</span>
			</td><td>nudges the selected shape<br>or point ${_GP.projectsettings.spinnervaluechange} em units<br><br></td></tr>
			<tr><td class='keycol'>
				<span class='keycallout'>shift</span>
				<span class='arrow'>&#x21E7;</span>
				<span class='arrow'>&#x21E9;</span>
				<span class='arrow'>&#x21E6;</span>
				<span class='arrow' style='margin-right:4px;'>&#x21E8;</span>
			</td><td>nudge 10 em units</td></tr>
			</table>

		</td><td style='padding-left:40px;'>

			<br>
			<table>
			<tr><td>&nbsp;</td><td><br><h3 style='margin-bottom:8px;'>edit canvas:</h3></td></tr>
			<tr><td class='keycol'><span class='keycallout'>spacebar</span></td><td>pan the edit canvas</td></tr>
			<tr><td class='keycol'><span class='keycallout'>v</span></td><td>select the shape edit arrow tool</td></tr>
			<tr><td class='keycol'><span class='keycallout'>b</span></td><td>select the path edit pen tool</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>mouse wheel</span></td><td>zoom the edit canvas</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>+</span></td><td>zoom in the edit canvas</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>&ndash;</span></td><td>zoom out the edit canvas</td></tr>
			<tr><td class='keycol'><span class='keycallout'>ctrl</span><span class='keycallout'>0</span></td><td>reset edit canvas zoom</td></tr>
			</table>

		</td></tr></table>`;
	}


//-------------------
// CONTEXT GLYPHS
//-------------------

	function drawContextGlyphs() {
		// debug('\n drawContextGlyphs - START');
		var selwid = getSelectedWorkItemID();
		var currGlyphObject = getGlyph(selwid, true);
		var currGlyphChar = hexToChars(selwid);
		var v = getView('drawContextGlyphs');
		var split = splitContextGlyphString(currGlyphChar);

		// debug('\t split: ' + split.left + ' | ' + split.right);
		// debug(`\t view: ${json(v, true)}`);


		clearCanvasHotspots();

		if(split.left) {
			var leftdistance = getGlyphSequenceAdvanceWidth(split.left);
			if(currGlyphObject.isautowide) leftdistance += currGlyphObject.getLSB();
			leftdistance += calculateKernOffset(split.left.charAt(split.left.length-1), currGlyphChar);

			// debug(`\t leftdistance: ${leftdistance}`);

			_UI.contextglyphs.leftseq = new GlyphSequence({
				glyphstring:split.left,
				scale: v.dz,
				drawLineExtras:drawContextGlyphLeftLineExtras,
				drawGlyphExtras:drawContextGlyphExtras,
				drawGlyph:drawContextGlyph,
				maxes: {
					xmin: (v.dx - (leftdistance*v.dz)),
					ymin: (v.dy)
				}
			});

			_UI.contextglyphs.leftseq.draw();
		}

		if(split.right) {
			var rightdistance = currGlyphObject.getAdvanceWidth();
			if(currGlyphObject.isautowide) rightdistance -= currGlyphObject.getLSB();
			rightdistance += calculateKernOffset(currGlyphChar, split.right.charAt(0));

			// debug(`\t rightdistance: ${rightdistance}`);

			_UI.contextglyphs.rightseq = new GlyphSequence({
				glyphstring:split.right,
				scale: v.dz,
				drawLineExtras:drawContextGlyphRightLineExtras,
				drawGlyphExtras:drawContextGlyphExtras,
				drawGlyph:drawContextGlyph,
				maxes: {
					xmin:(v.dx + (rightdistance*v.dz)),
					ymin: (v.dy)
				}
			});

			_UI.contextglyphs.rightseq.draw();
		}

		// debug(' drawContextGlyphs - END\n');
	}

	function splitContextGlyphString(splitchar) {
		var ctxgs = getContextGlyphString();

		var l = '';
		var r = '';

		var pos = ctxgs.indexOf(splitchar);

		if(pos === -1){
			l = ctxgs;
			r = '';

		} else {
			l = ctxgs.substr(0, pos);
			r = ctxgs.substr(pos+splitchar.length);
		}

		return {left:l, right:r};
	}

	function getGlyphSequenceAdvanceWidth(sequence) {
		var advanceWidth = 0;
		sequence = findAndMergeLigatures(sequence.split(''));

		var g;
		sequence.forEach(function(v, i, a) {
			g = getGlyph(charToHex(v));
			if(g){
				advanceWidth += g.getAdvanceWidth();
				if(a[i+1]) advanceWidth += calculateKernOffset(v, a[i+1]);

			} else {
				advanceWidth += _GP.projectsettings.upm*1 / 2;
			}
		});

		return advanceWidth;
	}

	function drawContextGlyphLeftLineExtras(char, seq) {
		var alpha = transparencyToAlpha(_GP.projectsettings.colors.systemguidetransparency);
		var color = RGBAtoRGB('rgb(204,81,0)', alpha);
		drawVerticalLine((char.view.dx*char.view.dz), false, color);

		var kern = calculateKernOffset(seq.glyphstring[seq.glyphstring.length-1], getSelectedWorkItemChar());

		if(kern) {
			var selwi = getSelectedWorkItem();
			var v = getView('drawContextGlyphLeftLineExtras');
			kern *= -1;
			var rightx = selwi.isautowide? kern-selwi.getLSB() : kern;
			rightx = v.dx + (rightx * v.dz);
			var texty = sy_cy(_GP.projectsettings.descent-60);

			drawGlyphKernExtra(-kern, rightx, texty, v.dz);
		}
	}

	function drawContextGlyphRightLineExtras(char, seq) {

		var kern = calculateKernOffset(getSelectedWorkItemChar(), char.char);

		if(kern) {
			var v = getView('drawContextGlyphRightLineExtras');
			var selwi = getSelectedWorkItem();
			var rightx = selwi.getAdvanceWidth();
			if(selwi.isautowide) rightx -= selwi.getLSB();
			rightx = v.dx + (rightx * v.dz);
			var texty = sy_cy(_GP.projectsettings.descent-60);

			drawGlyphKernExtra(kern, rightx, texty, v.dz);
		}
	}

	function drawContextGlyphExtras(char) {
		// debug('\n drawContextGlyphExtras - START');

		// debug(`\t ${char.char}
		// 	width \t ${char.width}
		// 	aggr \t ${char.aggregate}
		// 	lnbr \t ${char.islinebreaker}
		// 	view \t ${json(char.view, true)}
		// 	line \t ${char.linenumber}
		// \n`);
		// debug(char.glyph);

		var ps = _GP.projectsettings;
		var alpha = transparencyToAlpha(ps.colors.systemguidetransparency);

		if(ps.showcontextglyphguides && alpha){
			var ctx = _UI.glypheditctx;
			var view = getView('drawContextGlyphExtras');
			var advanceWidth = char.width * view.dz;
			var currx = (char.view.dx*view.dz);
			var rightx = currx + advanceWidth;
			var color = RGBAtoRGB('rgb(204,81,0)', alpha);
			var texty = sy_cy(_GP.projectsettings.descent-60);


			// Draw the glyph name
			var gname = char.glyph? char.glyph.getName() : getGlyphName(charsToHexArray(char.char));
			gname = gname.replace(/latin /i, '');
			drawGlyphNameExtra(gname, currx, texty, advanceWidth, color, char.char);

			// Draw vertical lines
			drawVerticalLine(rightx, false, color);

			// Draw kern notation
			if(char.kern) drawGlyphKernExtra(char.kern, rightx, texty, view.dz);
		}

		// debug(' drawContextGlyphExtras - END\n');
	}

	function drawGlyphNameExtra(text, currx, topy, advanceWidth, color, regHotspot) {
		// debug('\n drawGlyphNameExtra - START');
		// debug(`\t ${text} passed regHotspot ${regHotspot}`);

		var ctx = _UI.glypheditctx;
		var textw = ctx.measureText(text).width;
		var textx = currx + ((advanceWidth - textw) / 2); // center the glyph name
		var texty = topy + 22;

		ctx.font = '12px tahoma, verdana, sans-serif';

		ctx.strokeStyle = 'white';
		ctx.lineWidth = 10;
		ctx.strokeText(text, textx, texty);

		ctx.fillStyle = color;
		ctx.fillText(text, textx, texty);

		// Register hotspot
		if(regHotspot){
			registerCanvasHotspot({
				target:{
					xmin:currx,
					xmax:(currx + advanceWidth),
					ymin:texty-20,
					ymax:(texty+20)
				},
				underline:{
					xmin: textx-1,
					xmax: textx+textw+1,
					y: texty+6
				},
				onclick:function(){ hotspotNavigateToGlyph(charToHex(regHotspot)); }
			});
		}
	}

	function drawGlyphKernExtra(kern, rightx, topy, scale) {
		var desc = _GP.projectsettings.descent;
		var ctx = _UI.glypheditctx;
		var offset = 40;
		var color = RGBAtoRGB('rgb(255,0,255)', transparencyToAlpha(_GP.projectsettings.colors.systemguidetransparency));
		var barheight = Math.max((scale * 10), 1);

		ctx.font = '12px tahoma, verdana, sans-serif';
		ctx.fillStyle = color;
		ctx.fillRect(
			rightx,
			(topy + offset),
			(kern * scale),
			barheight
		);

		var text = 'kern: ' + kern;
		var textwidth = ctx.measureText(text).width;
		var textx = rightx - (((kern*-1*scale) - textwidth)/2) - textwidth;

		ctx.strokeStyle = color;
		drawVerticalLine((rightx + (kern*scale)), false, color);

		ctx.strokeStyle = 'white';
		ctx.lineWidth = 10;
		ctx.miterLimit = 1;

		// ctx.strokeText(text, textx, (topy + (offset*4)));
		// ctx.fillText(text, textx, (topy + (offset*4)));

		ctx.strokeText(text, textx, (topy + offset + barheight + 22));
		ctx.fillText(text, textx, (topy + offset + barheight + 22));
	}

	function drawContextGlyph(char) {
		// debug('\n drawContextGlyph - START');
		// debug(`\t ${char.char}
		// 	width \t ${char.width}
		// 	aggr \t ${char.aggregate}
		// 	lnbr \t ${char.islinebreaker}
		// 	view \t ${json(char.view, true)}
		// 	line \t ${char.linenumber}
		// \n`);
		// debug(char.glyph);
		var v = getView('drawContextGlyph');
		var c = char.view;

		if(!char.glyph) return;
		char.glyph.drawGlyph(_UI.glypheditctx, {dx:(c.dx*c.dz), dy:v.dy, dz:c.dz}, transparencyToAlpha(_GP.projectsettings.colors.contextglyphtransparency), true);

		// debug(' drawContextGlyph - END\n');
	}


//-------------------------------
//	CANVAS HOTSPOTS
//-------------------------------

	function registerCanvasHotspot(hotspot) { _UI.canvashotspots.push(hotspot); }

	function clearCanvasHotspots() { _UI.canvashotspots = []; }

	function isHotspotHere(cx, cy) {
		var chs = _UI.canvashotspots;
		var v;

		for(var i=0; i<chs.length; i++){
			v = chs[i];
			// debug(`isHotspotHere - checking ${v.target.xmin} - ${v.target.xmax} - ${v.target.ymin} - ${v.target.ymax}`);
			// debug(`results ${(cx <= v.target.xmax)} - ${(cx >= v.target.xmin)} - ${(cy <= v.target.ymax)} - ${(cy >= v.target.ymin)}`);
			if((cx <= v.target.xmax) && (cx >= v.target.xmin) && (cy <= v.target.ymax) && (cy >= v.target.ymin)){
				return v;
				break;
			}
		}

		return false;
	}

	function findAndCallHotspot(cx, cy) {
		_UI.canvashotspots.forEach(function (v, i, a) {
			if((cx <= v.target.xmax) && (cx >= v.target.xmin) && (cy <= v.target.ymax) && (cy >= v.target.ymin)){
				v.onclick();
			}
		});
	}

	function hotspotNavigateToGlyph(gid) {
		// debug('\n hotspotNavigateToGlyph - START');
		// debug('\t passed ' + gid);

		var v = getView('hotspotNavigateToGlyph');
		var currchar = getSelectedWorkItemChar();
		var newchar = hexToChars(gid);
		var ctxg = getContextGlyphString();
		var p1 = ctxg.indexOf(currchar);
		var p2 = ctxg.indexOf(newchar);
		var flipper;
		var leftchar;
		var rightchar;

		if(p1 < p2){
			flipper = 1;
			leftchar = currchar;
			rightchar = newchar;
		} else {
			flipper = -1;
			leftchar = newchar;
			rightchar = currchar;
		}


		var str = ctxg.substring(p1, p2);
		// debug(`\t substring from ${p1} to ${p2} yeilds ${str}`);

		var delta = getGlyphSequenceAdvanceWidth(str);

		// debug(`\t advance width: ${delta} screen pixels: ${sx_cx(delta)}`);
		// v.dx += sx_cx(delta);
		var kern = calculateKernOffset(leftchar, rightchar);
		// debug(`\t kern offset ${leftchar} and ${rightchar} is ${kern}`);

		v.dx += (v.dz * delta * flipper);
		v.dx += (v.dz * kern * flipper);

		getGlyph(gid, true).contextglyphs = ctxg;
		selectGlyph(gid);
		setView(v);

		_UI.redraw.redrawtools = true;
		update_ToolsArea();

		// debug(' hotspotNavigateToGlyph - END\n');
	}

	function findAndUnderlineHotspot(cx, cy) {
		// debug('\n findAndUnderlineHotspot - START');
		// debug(`\t cx:${cx} \t cy:${cy}`);
		var hs = isHotspotHere(cx, cy);
		var ctx = _UI.glypheditctx;
		// debug(`\t ${hs}`);
		if(hs){
			var t = (_GP.projectsettings.colors.systemguidetransparency);
			// var t2 = (((100 - t) / 2) + t);
			var alpha = transparencyToAlpha(t);
			var rgb = RGBAtoRGB('rgb(204,81,0)', alpha);

			ctx.strokeStyle = rgb;
			ctx.beginPath();
			ctx.moveTo(hs.underline.xmin, hs.underline.y.makeCrisp());
			ctx.lineTo(hs.underline.xmax, hs.underline.y.makeCrisp());
			ctx.stroke();
			setCursor('arrow');
		}

		return hs.target.xmin;
		// debug(' findAndUnderlineHotspot - END\n');
	}


//-------------------
// VIEW
//-------------------

	function setView(oa){

		var sc = (_UI.current_page === 'kerning')? getSelectedKernID() : getSelectedWorkItemID();
		var v = _UI.views;

		// Ensure there are at least defaults
		if(!isval(v[sc])){
			v[sc] = getView('setView');
		}

		// Check for which to set
		if(isval(oa.dx)){ v[sc].dx = oa.dx; }
		if(isval(oa.dy)){ v[sc].dy = oa.dy; }
		if(isval(oa.dz)){ v[sc].dz = oa.dz; }

	}

	function getView(calledby){
		// debug('\n getView - START');
		// debug('\t calledby: ' + calledby);

		var onkern = (_UI.current_page === 'kerning');
		var sc = onkern? getSelectedKernID() : getSelectedWorkItemID();
		var v = _UI.views;
		var re;

		if(isval(v[sc])){
			re = clone(v[sc]);
		} else {
			re = onkern? clone(_UI.defaultkernview) : clone(_UI.defaultview);
		}

		// debug('\t returning ' + json(re));
		// debug(' getView - END\n');

		return re;
	}

	function viewZoom(zfactor, center){
		var v = getView('viewZoom');
		var mx = _UI.eventhandlers.mousex;
		var my = _UI.eventhandlers.mousey;

		setView({
			'dz' : round(v.dz *= zfactor, 2),
			'dx' : center? v.dx : (mx - ((mx - v.dx) * zfactor)),
			'dy' : center? v.dy : (my - ((my - v.dy) * zfactor))
		});

		redraw({calledby:'viewZoom', redrawpanels:false});
	}

	function setViewZoom(zoom){
		zoom /= 100;
		var v = getView('setViewZoom');

		setView({
			'dz' : round(zoom, 2),
			'dx' : v.dx,
			'dy' : v.dy
		});

		redraw({calledby:'setViewZoom', redrawpanels:false});
	}

	function resetThumbView(){

		var zoom = ((_UI.thumbsize-(2*_UI.thumbgutter))/(_GP.projectsettings.upm));

		_UI.thumbview = {
			'dx' : _UI.thumbgutter,
			'dy' : (_UI.thumbgutter+(_GP.projectsettings.ascent*zoom)),
			'dz' : zoom
		};

		//debug('RESETTHUMBVIEW - set to \n' + JSON.stringify(_UI.thumbview));
	}

	function calculateDefaultView() {
		var ps = _GP.projectsettings;

		var ypadding = 80;		// Height of the UI across the top
		var canw = window.innerWidth - 470;	// 470 is the width of the left panel area
		var canh = window.innerHeight - ypadding;

		var strw = ps.upm / 2;
		var strh = ps.ascent - ps.descent;

		var zw, zh, nz;

		zw = round((canw / (strw * 1.4)), 3);
		zh = round((canh / (strh * 1.4)), 3);

		var nz = Math.min(zh, zw);
		var nx = round(((canw - (nz * strw)) / 2));
		var ny = round(((canh - (nz * strh)) / 2) + (ps.ascent * nz));

		_UI.defaultview = {dx: nx, dy: ny, dz: nz};
	}

	function fitViewToContextGlyphs(dontzoom) {
		debug('\n fitViewToContextGlyphs - START');
		var ps = _GP.projectsettings;

		var ypadding = 80;		// Height of the UI across the top
		var canw = window.innerWidth - 470;	// 470 is the width of the left panel area
		var canh = window.innerHeight - ypadding;
		// debug(`\t CAN \t ${canw} \t ${canh}`);

		var strw = _UI.contextglyphs.advancewidth;
		var strh = ps.ascent - ps.descent;
		// debug(`\t STR \t ${strw} \t ${strh}`);

		var zw, zh, nz;

		if(dontzoom){
			nz = getView('fitViewToContextGlyphs').dz;
			// debug(`\t VZ \t ${nz}`);

		} else {
			zw = round((canw / (strw * 1.4)), 3);
			zh = round((canh / (strh * 1.4)), 3);
			// debug(`\t NZ \t ${zw} \t ${zh}`);
		}

		var nz = Math.min(zh, zw);
		var nx = round(((canw - (nz * strw)) / 2));
		var ny = round(((canh - (nz * strh)) / 2) + (ps.ascent * nz));

		if(_UI.contextglyphs.string.length === 0) nx -= ((nz * strh) / 2);

		debug(`\t VIEW \t ${nx} \t ${ny} \t ${nz}`);

		setView({dx: nx, dy: ny, dz: nz});
	}

	function getStringAdvanceWidth(str) {
		var carr = findAndMergeLigatures(str.split(''));
		var g;
		var aw = 0;

		for(var c=0; c<carr.length; c++){
			g = getGlyph(charsToHexArray(carr[c])[0]);

			if(g) aw += g.getAdvanceWidth();

			if(c < carr.length-2){
				aw += calculateKernOffset(carr[c], carr[c+1]);
			}
		}

		return aw;
	}



//	-----------------------------------------------
//	Convert between Saved values and Canvas values
//	-----------------------------------------------
	//convert stored x-y coord to canvas x-y
	function sx_cx(sx){
		var v = getView('sx_cx');
		var canvasx = v.dx;
		canvasx += (sx*v.dz);
		return canvasx || v.dx;
	}

	function sy_cy(sy){
		var v = getView('sy_cy');
		var canvasy = v.dy;
		canvasy -= (sy*v.dz);
		return canvasy || v.dy;
	}

	//convert canvas x-y inputs to saved shape x-y
	function cx_sx(cx){
		var v = getView('cx_sx');
		return ((cx-v.dx)/(v.dz));
	}

	function cy_sy(cy){
		var v = getView('cy_sy');
		return ((v.dy-cy)/(v.dz));
	}



//	------------------------------------------
//	Global Get Selected Glyph and Shape
//	------------------------------------------

	function existingWorkItem() {
		var len = 0;
		var nph = _UI.current_panel;

		if(_UI.current_page === 'ligatures'){
			len = getLength(_GP.ligatures);
			if(!len){
				_UI.selectedligature = false;
				if(nph !== 'npNav') nph = 'npChooser';
				return false;
			}
		} else if (_UI.current_page === 'components'){
			len = getLength(_GP.components);
			if(!len){
				_UI.selectedcomponent = false;
				if(nph !== 'npNav') nph = 'npChooser';
				return false;
			}
		} else if (_UI.current_page === 'kerning'){
			len = getLength(_GP.kerning);
			if(!len){
				_UI.selectedkern = false;
				if(nph !== 'npNav') nph = 'npAttributes';
				return false;
			}
		}

		return true;
	}

	function getSelectedWorkItem(){
		// debug('\n getSelectedWorkItem - START');
		// debug('\t current_page: ' + _UI.current_page);
		var re;

		switch(_UI.current_page){
case 'glyph edit':
case 'global actions':
				if(!_UI.selectedglyph) _UI.selectedglyph = '0x0041';
				re = getGlyph(_UI.selectedglyph, true);
				// debug('\t case glyph edit, returning ' + re.name);
				return re;
			case 'import svg':
				if(!_UI.selectedsvgimporttarget) _UI.selectedsvgimporttarget = '0x0041';
				re = getGlyph(_UI.selectedsvgimporttarget, true);
				// debug('\t case import svg, returning ' + re.name);
				return re;
			case 'ligatures':
				re = getGlyph(_UI.selectedligature, true);
				// debug('\t case glyph edit, returning ' + re.name);
				return re;
			case 'components':
				re = getGlyph(_UI.selectedcomponent, false);
				// debug('\t case components, returning ' + re.name);
				return re;
			case 'kerning':
				// debug('\t case KERN - selkern = ' + _UI.selectedkern);
				if(!_UI.selectedkern) _UI.selectedkern = getFirstID(_GP.kerning);
				re = _GP.kerning[_UI.selectedkern] || false;
				// debug('\t case kerning, returning ' + re);
				return re;
		}

		return false;
	}

	function getSelectedWorkItemID(){
		switch(_UI.current_page){
			case 'glyph edit': 	return _UI.selectedglyph;
			case 'import svg':	return _UI.selectedsvgimporttarget;
			case 'ligatures':	return _UI.selectedligature;
			case 'components':	return _UI.selectedcomponent;
			case 'kerning':		return _UI.selectedkern;
		}

		return false;
	}

	function getSelectedWorkItemChar() {
		var swiid = getSelectedWorkItemID();
		return hexToChars(swiid);
	}

	function getSelectedWorkItemName(){
		// debug('\n getSelectedWorkItemName - START');
var wi = getSelectedWorkItem();
		// debug('\t wi = '+wi);
		return wi.name || wi.getName() || '[name not found]';
	}

	function getSelectedWorkItemShapes(){
		//debug('GETSELECTEDGLYPHSHAPES');
		var rechar = getSelectedWorkItem();
		return rechar? rechar.shapes : [];
	}

	function markSelectedWorkItemAsChanged() {
		// debug('\n markSelectedWorkItemAsChanged - START');
		var wi = getSelectedWorkItem();

		if(wi && wi.changed) {
			// debug('\t marking as changed');
			wi.changed(true, true);
		}

		// debug(' markSelectedWorkItemAsChanged - END\n');
	}

	function selectGlyph(c, dontnavigate){
		// debug('\n selectGlyph - START');
		// debug('\t selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedglyph = c;
		clickEmptySpace();
		markSelectedWorkItemAsChanged();

		if(!dontnavigate){
			// debug('\t selecting ' + _GP.glyphs[c].glyphhtml + ' and navigating.');
			navigate({panel:'npAttributes'});
		}

		// debug(' selectGlyph - END\n');
	}

	function selectComponent(c, dontnavigate){
		// debug('SELECTCOMPONENT - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedcomponent = c;
		clickEmptySpace();
		markSelectedWorkItemAsChanged();

		if(!dontnavigate){
			// debug('SELECTCOMPONENT: selecting ' + _GP.components[c].name + ' and navigating.');
			navigate({panel:'npAttributes'});
		}
	}

	function selectLigature(c, dontnavigate){
		// debug('SELECTLIGATURE - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedligature = c;
		clickEmptySpace();
		markSelectedWorkItemAsChanged();

		if(!dontnavigate){
			// debug('SELECTLIGATURE: selecting ' + _GP.ligatures[c].glyphhtml + ' and navigating.');
			navigate({panel:'npAttributes'});
		}
	}

	function selectSVGImportTarget(c, dontnavigate) {
		// debug('SELECTSVGIMPORTTARGET - selecting ' + getGlyph(c, true).name + ' from value ' + c);

		_UI.selectedsvgimporttarget = c;

		if(!dontnavigate){
			// debug('SELECTSVGIMPORTTARGET: selecting ' + c + ' and navigating.');
			navigate({panel:'npAttributes'});
		}
	}


//------------------------------
// Drawing controls
//------------------------------

	function draw_PathOutline(sh, accent, thickness) {
		// debug('\n draw_PathOutline - START');
		// debug('\t shape name = ' + sh.name);
		// debug('\t accent.l65 = ' + accent.l65);
		// debug('\t selectedtool = ' + _UI.selectedtool);

		if(!sh) return;

		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		var hp = (_GP.projectsettings.pointsize/2);
		_UI.glypheditctx.strokeStyle = accent.l65;
		_UI.glypheditctx.fillStyle = 'transparent';

		if(_UI.selectedtool==='newrect'){
			draw_BoundingBox(sh.getMaxes(), accent);

		} else if (_UI.selectedtool==='newoval'){
			_UI.glypheditctx.strokeStyle = accent.l65;
			var tpdso = ovalPathFromMaxes(_UI.eventhandlers.tempnewbasicshape);

			_UI.glypheditctx.lineWidth = 1;
			_UI.glypheditctx.strokeStyle = accent.l65;

			_UI.glypheditctx.beginPath();
			tpdso.drawPath(_UI.glypheditctx);
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.stroke();

		} else {
			// Draw Path Points
			if(!sh.path) return;

			// Draw path selection outline
			_UI.glypheditctx.lineWidth = thickness;
			_UI.glypheditctx.strokeStyle = accent.l65;

			_UI.glypheditctx.beginPath();
			sh.path.drawPath(_UI.glypheditctx);
			_UI.glypheditctx.closePath();
			_UI.glypheditctx.stroke();
		}

		// debug(' draw_PathOutline - END\n');
	}

	function draw_PathPoints(pparr, accent) {
		// debug('\n draw_PathPoints - START');
		pparr = pparr || [];


		for(var p=0; p<pparr.length; p++){
			// debug('\t point ' + p + ' isSelected ' + _UI.ms.points.isSelected(pparr[p]));

			if(p===0){
				pparr[p].drawDirectionalityPoint(accent, pparr[(p+1)%pparr.length]);
			} else {
				pparr[p].drawPoint(accent);
			}
		}

		// debug(' draw_PathPoints - END\n');
	}

	function draw_PathPointHandles(pparr, accent) {
		pparr = pparr || [];

		for(var p=0; p<pparr.length; p++){
			pparr[p].drawHandles(true, true, accent);
		}
	}

	function draw_BoundingBox(maxes, accent, thickness) {
		// debug('\n draw_BoundingBox - START');
		// debug(maxes);
		// debug('\t accent: ' + accent.l65);

		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		var lx = sx_cx(maxes.xmin);
		var rx = sx_cx(maxes.xmax);
		var ty = sy_cy(maxes.ymax);
		var by = sy_cy(maxes.ymin);

		if(thickness > 1){
			lx -= thickness;
			rx += thickness;
			ty -= thickness;
			by += thickness;
		}

		var w = (rx-lx);
		var h = (by-ty);

		_UI.glypheditctx.fillStyle = 'transparent';
		_UI.glypheditctx.strokeStyle = accent.l65;
		_UI.glypheditctx.lineWidth = thickness;
		_UI.glypheditctx.strokeRect(lx,ty,w,h);
		// debug(' draw_BoundingBox - END\n');
	}

	function draw_BoundingBoxHandles(maxes, accent, thickness) {
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		var bb = getBoundingBoxHandleDimensions(maxes, thickness);

		_UI.glypheditctx.fillStyle = 'white';
		_UI.glypheditctx.lineWidth = 1;
		_UI.glypheditctx.strokeStyle = accent.l65;

		//rotate handle
		if(_UI.ms.shapes.rotateable()){
			var h = _UI.rotatehandleheight;
			_UI.glypheditctx.lineWidth = thickness;
			draw_Line({x:bb.midx + bb.hp, y:bb.topy}, {x:bb.midx + bb.hp, y:bb.topy - h});
			_UI.glypheditctx.lineWidth = 1;
			draw_CircleHandle({x:bb.midx + bb.hp, y:bb.topy - h + bb.hp});
		}


		//upper left
		if(canResize('nw')) draw_SquareHandle({x:bb.leftx, y:bb.topy});

		//top
		if(canResize('n')) draw_SquareHandle({x:bb.midx, y:bb.topy});

		//upper right
		if(canResize('ne')) draw_SquareHandle({x:bb.rightx, y:bb.topy});

		// right
		if(canResize('e')) draw_SquareHandle({x:bb.rightx, y:bb.midy});

		//lower right
		if(canResize('se')) draw_SquareHandle({x:bb.rightx, y:bb.bottomy});

		//bottom
		if(canResize('s')) draw_SquareHandle({x:bb.midx, y:bb.bottomy});

		//lower left
		if(canResize('sw')) draw_SquareHandle({x:bb.leftx, y:bb.bottomy});

		//left
		if(canResize('w')) draw_SquareHandle({x:bb.leftx, y:bb.midy});

		// //Center Dot
		// _UI.glypheditctx.fillRect(bb.midx, bb.midy, ps, ps);
		// _UI.glypheditctx.strokeRect(bb.midx, bb.midy, ps, ps);
	}

	function draw_RotationAffordance(accent, thickness) {
		accent = accent || _UI.colors.blue;
		thickness = thickness || 1;
		var center = clone(_UI.eventhandlers.rotationcenter);
		var starttopy = _UI.eventhandlers.rotationstarttopy;
		var mx = _UI.eventhandlers.mousex;
		var my = _UI.eventhandlers.mousey;
		var ss = _UI.ms.shapes;
		var angle = calculateAngle({x:cx_sx(mx), y:cy_sy(my)}, center);

		// debug('\t Init angle:\t' + angle);

		var rotatehandle = {x:center.x, y:starttopy};
		rotate(rotatehandle, angle, center);
		rotate(rotatehandle, (Math.PI/-2), center);

		// debug('\t Drag Angle:\t' + round(angle, 2));

		var counterclockwise = false;
		if(Math.abs(angle) > (Math.PI/2)) {
			counterclockwise = true;
		}


		// Convert things to Canvas System
		rotatehandle.x = sx_cx(rotatehandle.x);
		rotatehandle.y = sy_cy(rotatehandle.y);
		center.x = sx_cx(center.x);
		center.y = sy_cy(center.y);
		starttopy = sy_cy(starttopy);
		var radius = calculateLength(center, rotatehandle);


		var ctx = _UI.glypheditctx;

		// Pizza Pie Sweep
		ctx.fillStyle = accent.l65;
		ctx.strokeStyle = accent.l65;
		ctx.globalAlpha = 0.3;
		ctx.beginPath();
		ctx.moveTo(center.x, center.y);
		ctx.arc(center.x, center.y, radius, (Math.PI/-2), (angle*-1), counterclockwise);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		// rotate Handle
		ctx.strokeStyle = accent.l65;
		ctx.fillStyle = 'white';
		ctx.lineWidth = thickness;
		draw_Line({x:rotatehandle.x, y:rotatehandle.y}, {x:center.x, y:center.y});
		ctx.lineWidth = 1;
		draw_CircleHandle(rotatehandle);

		// readout
		var readout = round(calculateNiceAngle(angle),1);
		if(counterclockwise) readout -= 360;
		readout = round(readout, 1);

		// debug('\t Readout angle:\t' + readout);

		ctx.font = '24px OpenSans';
		ctx.fillStyle = accent.l65;
		ctx.globalAlpha = 0.8;
		ctx.fillText((''+readout+'°'), center.x, starttopy-24);

		ctx.globalAlpha = 1;
	}

	function draw_Line(p1, p2) {
		_UI.glypheditctx.beginPath();
		_UI.glypheditctx.moveTo(p1.x, p1.y);
		_UI.glypheditctx.lineTo(p2.x, p2.y);
		_UI.glypheditctx.closePath();
		_UI.glypheditctx.stroke();
	}

	function draw_SquareHandle(ul) {
		var ps = _GP.projectsettings.pointsize;
		_UI.glypheditctx.fillRect(ul.x, ul.y, ps, ps);
		_UI.glypheditctx.strokeRect(ul.x, ul.y, ps, ps);
	}

	function draw_CircleHandle(center) {
		_UI.glypheditctx.beginPath();
		_UI.glypheditctx.arc(center.x, center.y, (_GP.projectsettings.pointsize/2), 0, Math.PI*2, true);
		_UI.glypheditctx.closePath();
		_UI.glypheditctx.fill();
		_UI.glypheditctx.stroke();
	}

	function isOverBoundingBoxHandle(px, py, maxes, thickness) {
		// debug('\n isOverBoundingBoxHandle - START');
		// debug('\t px/py - ' + px + ' / ' + py);
		// debug('\t maxes - ' + json(maxes, true));

		if(!maxes) return false;
		var ps = _GP.projectsettings.pointsize;
		var bb = getBoundingBoxHandleDimensions(maxes, thickness);

		// debug('\t point size - ' + ps);
		// debug('\t l/m/r x: ' + bb.leftx + ' / ' + bb.midx + ' / ' + bb.rightx);
		// debug('\t t/m/b y: ' + bb.topy + ' / ' + bb.midy + ' / ' + bb.bottomy);

		// rotation handle
		if(_UI.ms.shapes.rotateable()){
			if( ((px > bb.midx) && (px < bb.midx+ps)) &&
				((py > bb.topy-_UI.rotatehandleheight) && (py < bb.topy-_UI.rotatehandleheight+ps)) ){
				return 'rotate';
			}
		}

		// upper left
		if( ((px > bb.leftx) && (px < bb.leftx+ps)) &&
			((py > bb.topy) && (py < bb.topy+ps)) ){
			return 'nw';
		}

		// top
		if( ((px > bb.midx) && (px < bb.midx+ps)) &&
			((py > bb.topy) && (py < bb.topy+ps)) ){
			return 'n';
		}

		// upper right
		if( ((px > bb.rightx) && (px < bb.rightx+ps)) &&
			((py > bb.topy) && (py < bb.topy+ps)) ){
			return 'ne';
		}

		// right
		if( ((px > bb.rightx) && (px < bb.rightx+ps)) &&
			((py > bb.midy) && (py < bb.midy+ps)) ){
			return 'e';
		}

		// lower right
		if( ((px > bb.rightx) && (px < bb.rightx+ps)) &&
			((py > bb.bottomy) && (py < bb.bottomy+ps)) ){
			return 'se';
		}

		// bottom
		if( ((px > bb.midx) && (px < bb.midx+ps)) &&
			((py > bb.bottomy) && (py < bb.bottomy+ps)) ){
			return 's';
		}

		// lower left
		if( ((px > bb.leftx) && (px < bb.leftx+ps)) &&
			((py > bb.bottomy) && (py < bb.bottomy+ps)) ){
			return 'sw';
		}

		// left
		if( ((px > bb.leftx) && (px < bb.leftx+ps)) &&
			((py > bb.midy) && (py < bb.midy+ps)) ){
			return 'w';
		}

		// debug(' isOverBoundingBoxHandle - returning FALSE - END\n');
		return false;
	}

	function getBoundingBoxHandleDimensions(maxes, thickness) {
		var dimensions = {};
		var hp = _GP.projectsettings.pointsize/2;
		thickness = thickness || 1;

		// Translation Fidelity - converting passed canvas values to saved value system
		dimensions.leftx = (sx_cx(maxes.xmin) - hp); //.makeCrisp(false);
		dimensions.midx = Math.floor(sx_cx(maxes.xmin)+((sx_cx(maxes.xmax)-sx_cx(maxes.xmin))/2)-hp);
		dimensions.rightx = (sx_cx(maxes.xmax) - hp); //.makeCrisp(true);

		dimensions.topy = (sy_cy(maxes.ymax) - hp); //.makeCrisp(true);
		dimensions.midy = Math.floor(sy_cy(maxes.ymax)+((sy_cy(maxes.ymin)-sy_cy(maxes.ymax))/2)-hp);
		dimensions.bottomy = (sy_cy(maxes.ymin) - hp); //.makeCrisp(false);


		if(thickness > 1){
			dimensions.leftx -= thickness;
			dimensions.rightx += thickness;
			dimensions.topy -= thickness;
			dimensions.bottomy += thickness;
		}

		dimensions.hp = hp;

		return dimensions;
	}


//-------------------
// Drawing Grid
//-------------------

	function drawGrid(){
		// debug('\n drawGrid - START');

		var xs = {
			'xmax': _UI.glypheditcanvassize,
			'xmin': 0,
			'ymax': _UI.glypheditcanvassize,
			'ymin': 0
		};

		// background white square
		_UI.glypheditctx.fillStyle = 'white';
		_UI.glypheditctx.fillRect(xs.xmin, xs.ymin, xs.xmax-xs.xmin, xs.ymax-xs.ymin);

		if(_UI.showgrid){
			var ps = _GP.projectsettings;
			var v = getView('grid');
			var gsize = ((ps.upm/ps.griddivisions)*v.dz);
			var gridcolor = RGBAtoRGB('rgb(170,170,170)', transparencyToAlpha(_GP.projectsettings.colors.gridtransparency));
			_UI.glypheditctx.lineWidth = 1;

			if(gsize > 0 && gsize < _UI.glypheditcanvassize){
				for(var i=v.dx; i<xs.xmax-1; i+=gsize){ drawVerticalLine(i, _UI.glypheditctx, gridcolor); }
				drawVerticalLine(xs.xmax+1, _UI.glypheditctx, gridcolor);
				for(var j=v.dx; j>=xs.xmin; j-=gsize){ drawVerticalLine(j, _UI.glypheditctx, gridcolor); }

				for(var k=v.dy; k<xs.ymax-1; k+=gsize){ drawHorizontalLine(k, _UI.glypheditctx, gridcolor); }
				drawHorizontalLine(xs.ymax, _UI.glypheditctx, gridcolor);
				for(var p=v.dy; p>=xs.ymin; p-=gsize){ drawHorizontalLine(p, _UI.glypheditctx, gridcolor); }

			} else {
				console.warn('Grid size computed as ' + gsize + ', not drawing grid.');
			}
		}
	}

	function drawHorizontalLine(y, ctx, color){
		ctx = ctx || _UI.glypheditctx;
		color = color || 'rgb(0,0,0)';

		ctx.strokeStyle = color;
		ctx.lineWidth = 1;
		y = y.makeCrisp();
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(_UI.glypheditcanvassize, y);
		ctx.stroke();
		ctx.closePath();
	}

	function drawVerticalLine(x, ctx, color){
		ctx = ctx || _UI.glypheditctx;
		color = color || 'rgb(0,0,0)';

		ctx.strokeStyle = color;
		ctx.lineWidth = 1;
		x = x.makeCrisp();
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, _UI.glypheditcanvassize+1);
		ctx.stroke();
		ctx.closePath();
	}

	function drawGuides() {
		// debug('\n drawGuides - START');

		if(!getSelectedWorkItemID()) return;

		var ps = _GP.projectsettings;
		var onglyphedit = (_UI.current_page === 'glyph edit' || _UI.current_page === 'ligatures');
		var onkern = (_UI.current_page === 'kerning');
		// debug('\t ps.guides: ');
		// debug(ps.guides);

		if(_UI.showguides){

			if (onkern){
				_UI.guides.leftgroup_xmax.location = getSelectedKern().value;
				_UI.guides.leftgroup_xmax.draw();
				_UI.guides.rightgroup_xmin.draw();
				ps.guides.baseline.draw();
				return;
			}

			// Update custom guides
			var g;
			for(var c in ps.guides){if(ps.guides.hasOwnProperty(c)){
				g = ps.guides[c];
				if(g.editable){
					g.draw();
				}
			}}

			var selwi = getSelectedWorkItem();
			if(selwi){
				var t = _UI.eventhandlers.tempnewbasicshape;
				var rl = t? Math.max(selwi.glyphwidth, t.xmax) :  selwi.glyphwidth;
				var ll = Math.min(selwi.maxes.xmin, 0);


				// Update system guides
				ps.guides.xheight.location = ps.xheight;
				ps.guides.capheight.location = ps.capheight;
				ps.guides.ascent.location = ps.ascent;
				ps.guides.baseline.location = 0;
				ps.guides.descent.location = ps.descent;
				ps.guides.min.location = ll;
				ps.guides.max.location = rl;
				ps.guides.leftside.location = (getSelectedGlyphLeftSideBearing()*-1);
				ps.guides.rightside.location = getSelectedGlyphRightSideBearing() + rl;

				// Minor Guidelines - Overshoots
				if(_UI.showovershoots){
					var os = ps.overshoot;
					ps.guides.xheight.draw(-1*os);
					ps.guides.ascent.draw(-1*os);
					ps.guides.baseline.draw(os);
					ps.guides.descent.draw(os);
				}

				// Verticals
				ps.guides.zero.draw(0);
				if(onglyphedit){
					ps.guides.min.draw(0);
					ps.guides.leftside.draw();
					if(getSelectedWorkItemShapes().length || !selwi.isautowide){
						ps.guides.max.draw(0);
						ps.guides.rightside.draw();
					}
				}

				// Horizontals
				ps.guides.xheight.draw();
				ps.guides.capheight.draw();
				ps.guides.ascent.draw();
				ps.guides.descent.draw();
				ps.guides.baseline.draw();

				// Out of bounds triangle
				if(ps.guides.baseline.visible || ps.guides.leftside.visible){
					var ctx = _UI.glypheditctx;
					var v = getView('guides');
					ctx.fillStyle = shiftColor(ps.guides.baseline.color, ps.colors.systemguidetransparency/100, true);
					ctx.beginPath();
					ctx.moveTo(v.dx-1, v.dy);
					ctx.lineTo(v.dx-1, v.dy+(ps.pointsize*2));
					ctx.lineTo(v.dx-1-(ps.pointsize*2), v.dy);
					ctx.closePath();
					ctx.fill();
				}
			}
		}
		// debug(' drawGuides - END\n');
	}


//-------------------
// INIT
//-------------------
	function setupGhostCanvas(){
		//Is Here Ghost Canvas - same size as CEC
		_UI.ishereghostcanvas = getEditDocument().getElementById('ishereghostcanvas');
		_UI.ishereghostcanvas.height = _UI.glypheditcanvassize;
		_UI.ishereghostcanvas.width = _UI.glypheditcanvassize;
		_UI.ishereghostctx = _UI.ishereghostcanvas.getContext('2d');
		_UI.ishereghostctx.fillStyle = 'cyan';
		// _UI.ishereghostctx.globalAlpha = 0.5;
		_UI.ishereghostcanvas.style.backgroundColor = 'transparent';
	}

	function setupEditCanvas(){
		_UI.glypheditcanvas = getEditDocument().getElementById('glypheditcanvas');
		_UI.glypheditcanvas.height = _UI.glypheditcanvassize;
		_UI.glypheditcanvas.width = _UI.glypheditcanvassize;
		_UI.glypheditctx = _UI.glypheditcanvas.getContext('2d');
		_UI.glypheditctx.globalAlpha = 1;
		_UI.glypheditcanvas.onselectstart = function () { return false; };		//for Chrome, disable text select while dragging
		_UI.glypheditcanvas.onmouseout = mouseoutcec;
		_UI.glypheditcanvas.customguidetransparency = mouseovercec;
	}

// end of file// start of file
/**
	Framework > Unicode
	Anything having to do with / working with
	Unicode values.  Also working with Unicode
	ranges, like basic latin.
**/


//	--------------------
//	Conversion Functions
//	--------------------
	function decToHex(d) { var dr = Number(d).toString(16); while(dr.length < 4) { dr = '0'+dr; } return '0x'+dr.toUpperCase(); }

	function decToHTML(d) { return hexToHTML(decToHex(d)); }

	function charToHex(s) {
		var result = '';
		for(var i=0; i<s.length; i++) result += decToHex(String(s).charCodeAt(i));
		return result;
	}

	function charsToHexArray(s) {
		var result = [];
		for(var i=0; i<s.length; i++) result.push(decToHex(String(s).charCodeAt(i)));
		return result;
	}

	function hexToChars(u) {
		if(String(u).charAt(1) !== 'x') u = String(decToHex(u));
		// debug('\n hexToChars - START');
		// debug('\t passed ' + u + ' which is a ' + typeof u);
		u = u.split('0x');
		var result = '';
		for(var i=0; i<u.length; i++){ if(u[i] !== ''){
			u[i] = String.fromCharCode('0x'+u[i]);
			// debug('\t added ' + u[i]);
			if(u[i]) result += u[i];
		}}
		// debug(' hexToHTML - END\n');
		return result;
	}

	function hexToHTML(h) {
		// debug('\n hexToHTML - START');
		// debug('\t passed ' + h);
		if(!h || h.indexOf('0x') < 0) return false;

		h = String(h).split('0x');
		var result = '';
		for(var i=0; i<h.length; i++){ if(h[i] !== ''){
			h[i] = ('0x'+h[i]);
			h[i] = parseInt(h[i],16);
			if(h[i]) result += ('&#'+h[i]+';');
		}}
		return result;
	}

	function hexToUnicodeHex(h){
		return (h.replace(/0x/, '&#x') + ';');
	}

	function parseUnicodeInput(str) {
		// takes any kind or number of input
		// Unicode, Hex, or glyph
		// and returns an array of padded hex values

		// debug('\n parseUnicodeInput - START');
		// debug('\t passed ' + str);

		if(!str) return false;

		var entries = [];
		var results = [];

		if(isInputUnicode(str)) {
			// debug(`\t U+ format detected`);			
			str = str.replace(/u\+/g, 'U+');
			entries = str.split('U+');

		} else if (isInputHex(str)) {
			// debug(`\t 0x format detected`);			
			str = str.replace(/0X/g, '0x');
			entries = str.split('0x');

		} else {
			// debug(`\t Number detected`);
			return charsToHexArray(str);
		}

		var te;
		for(var e=0; e<entries.length; e++){
			te = entries[e];
			te = te.replace(/;/g, '');
			
			if(!validateHex(te, true)) return false;

			if(te !== ''){
				while(te.length < 4) te = '0'+te;
				te = ('0x'+te.toUpperCase());
				// debug('\t parsed ' + e + ' as ' + te);
				results.push(te);
			}
		}

		// debug('\t returning ' + JSON.stringify(results));
		// debug('parseUnicodeInput - END\n');
		return results;
	}

	function isInputUnicode(str) {
		str = str.replace(/u\+/g, 'U+');
		if(str.length <= 3) return 0;

		var count = 0;
		var pos = str.indexOf('U+');
		while(pos !== -1){
			count ++;
			pos = str.indexOf('U+', pos+3);
		}
		return count;
	}

	function isInputHex(str) {
		str = str.replace(/0X/g, '0x');
		if(str.length <= 3) return 0;

		var count = 0;
		var pos = str.indexOf('0x');
		while(pos !== -1){
			count ++;
			pos = str.indexOf('0x', pos+3);
		}
		return count;
	}
	
	function validateHex(str, dontcheckprefix) {
		var green = '0123456789ABCDEF';
		str = str.toString();
		str = str.toUpperCase();
		
		if(!dontcheckprefix) {
			if(str.startsWith('U+') || str.startsWith('0X')) {
				str = str.substring(2);
			}
		}

		if(str.length > 4) return false;

		for(var c=0; c<str.length; c++){
			if(green.indexOf(str.charAt(c)) === -1) return false;
		}

		return true;
	}

	function unicodeInputHelp() {
		var re = '<h1>Using Unicode Values</h1>'+
			'Unicode is a format used by fonts that assigns an ID number to every glyph. Glyphr Studio uses<br>'+
			'this format for importing fonts, and for identifying glyphs, kern pairs, and ligatures.<br><br>'+
			'Glyphr Studio accepts three flavors of this ID number:<br>'+
			'<ul>'+
				'<li><b>Hexadecimal Number</b> - a base-16 number with a 0x prefix. <br>For example, <pre>0x4E</pre> corresponds to Capital N.</li>'+
				'<li><b>Unicode Number</b> - a base-16 number with a U+ prefix. <br>For example, <pre>U+4E</pre> corresponds to Capital N.</li>'+
				'<li><b>Character</b> - the ID of any character that you type or copy-paste will be recognized.</li>'+
			'</ul>'+
			'<br>'+
			'When you input any of these formats, Glyphr Studio will validate the input, and convert it to<br>'+
			'a four digit hex format (like <pre>0x004E</pre>).<br><br>'+
			'Note: Glyphr Studio is limited to the Basic Multilingual Plane, Unicode <pre>U+0000</pre> through <pre>U+FFFF</pre>.<br>'+
			'Unicode range notation is not supported.'+
			'';
		return re;
	}


//	-----------------
//	Glyph Name Wrapper
//	-----------------

	function getUnicodeName(ch) {
		// debug('\n getUnicodeName - START');
		// debug('\t passed ' + ch);
		ch = ''+ch;
		var re;
		
		if(_UI && _UI.unicodeNames && _UI.unicodeNames[ch]){
		 	return _UI.unicodeNames[ch];
		} else {
			return getUnicodeBlockName(ch);
		}

		// debug(' getUnicodeName - END - returning ' + re + '\n');
		return re;
	}

	function getUnicodeBlockName(ch) {
		var chn = ch*1;
		var block;

		for(var i=0; i<_UI.unicodeBlocks.length; i++){
			block = _UI.unicodeBlocks[i];
			if(chn >= block.begin && chn <= block.end){
				return block.name + ' - ' + ch.substr(2);
			}
		}

		return '[name not found]';
	}

	function getUnicodeShortName(ch) {
		// debug('\n getUnicodeShortName - START');
		// debug('\t passed ' + ch);
		ch = ''+ch;
		var name = _UI.unicodeShortNames[ch];
		if(!name) {
			name = getUnicodeName(ch);
			if(name && name !== '[name not found]') name = name.replace(/latin /gi, '').replace(/ /g, '').substr(0,20);
			else name = '[name not found]';
		}

		// debug(' getUnicodeShortName - returning ' + name + ' - END\n');
		return name;
	}

// end of file// post.js
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');


const project_file = process.argv[2];
const output_file = process.argv[3];

if(project_file === undefined) process.exit(1);
if(output_file === undefined) process.exit(1);

function saveFile(filename,con){
    fs.writeFileSync(output_file,con);
}

function setupGhostCanvas(){
	_UI.ishereghostctx = createCanvas(1000, 1000).getContext('2d');
}

function setupEditCanvas(){
	_UI.glypheditctx = createCanvas(1000, 1000).getContext('2d');
}


_UI.droppedFileContent = fs.readFileSync(project_file,'utf8');
_UI.ishereghostctx = createCanvas(1000, 1000).getContext('2d');
importGlyphrProjectFromText();
ioSVG_exportSVGfont();