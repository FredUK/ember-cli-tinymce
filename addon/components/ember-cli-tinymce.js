import Ember from 'ember';
//jshint camelcase:false
//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
export default Ember.Component.extend({
  classNames: ['text-editor'],

  _options: {
    skin_url: '/ember-cli-tinymce/tinymce/skins/lightgray',
    theme_url: '/ember-cli-tinymce/tinymce/themes/modern/theme.min.js',
    external_plugins: {
      image: '/ember-cli-tinymce/tinymce/plugins/image/plugin.min.js',
      link: '/ember-cli-tinymce/tinymce/plugins/link/plugin.min.js',
      table: '/ember-cli-tinymce/tinymce/plugins/table/plugin.min.js',
      textcolor: '/ember-cli-tinymce/tinymce/plugins/textcolor/plugin.min.js',
      colorpicker: '/ember-cli-tinymce/tinymce/plugins/colorpicker/plugin.min.js'
    },
    menubar: true,
    toolbar1: 'insertfile undo redo | styleselect | forecolor backcolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link'
  },

  onInit: function() {

    Ember.run.scheduleOnce('afterRender', () => {
      var options = this.get('_options');
      Ember.merge(options, {
        setup: editor => {
          this.set('editor', editor);
          editor.on('change', () => {
            this.set('value', editor.getContent());
          });
        }
      });

      this.$('textarea').tinymce(options);
    });
  }.on('init'),

  valueChanged: Ember.computed('value', function() {
    tinymce.editors.filter((editor) => {
      return editor.id === this.get('editor').id;
    }).forEach(function(editor) {
      editor.setContent(this.get('value'));
    });
  })
});
