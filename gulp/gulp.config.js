module.exports = {
  dist_dir: './dist',
  jquery:'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js',
  googlesMap:'https://maps.googleapis.com/maps/api/js?key=AIzaSyCbt1MzT95dG4Tg9C-wF8BPH48Lyio3gok&v=3&callback=initMap',
  bootstrap:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
  fontawesome:'https://use.fontawesome.com/498aa34772.js',
  app_files: {
    js : ['src/js/**/*.js'],
    tpl_src : ['./dist/js/**/*.js',
        './dist/css/**/*.css']
  }
};
