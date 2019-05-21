'use strict';

const notify = tars.packages.notify;
const gutil = tars.packages.gutil;
const notifyConfig = tars.config.notifyConfig;
const path = require('path');
const gulp = tars.packages.gulp;

function cutUselessLog(error) {
  return error.message.replace(/(at\sParser\.pp\.raise[\s\S]*)/, '');
}

/**
 * Notify helper
 */
module.exports = {
  /**
   * On error notifier
   * @param  {String} message Error message
   * @param  {Error} error    Error object
   * @return {Pipe}
   */
  error(message, error, params) {
    message = message || 'Something is happen while working.';
    error = error || new Error();
    params = params || {};

    const resultMessage = '\n' + message + '\nLook in the console for details.\n';

    if (!(error instanceof(Error))) {
      error = new Error(error);
    }

    if (process.env.NODE_ENV !== 'production' && !process.env.DISABLE_NOTIFIER) {
      notify.onError({
        sound: notifyConfig.sounds.onError,
        title: notifyConfig.title,
        message: resultMessage,
        icon: path.resolve(tars.root + '/icons/tars_error.png'),
        onLast: true
      })(error);
    } else {
      console.error(gutil.colors.red(message + '\n'));
    }

    if (error.message) {
      console.log(gutil.colors.underline.red('Error details:\n'));
      console.error(cutUselessLog(error));
      console.log(gutil.colors.red('_______________\n'));
    }

    return tars.packages.gutil.noop();
  },

  /**
   * On success notifier
   * @param  {String}  message  Success message
   * @param  {Boolean} onLast   Use notify only on last changed file
   * @return {Pipe}
   */
  success(message, params) {

    if (notifyConfig.useNotify && tars.options.notify && process.env.NODE_ENV !== 'production') {
      params = params || {};

      const defaultConfig = {
        sound: notifyConfig.sounds.onSuccess,
        title: notifyConfig.title,
        templateOptions: {
          date: tars.helpers.dateFormatter.getTimeOfModify()
        },
        icon: path.resolve(tars.root + '/icons/tars.png')
      };
      let resultMessage = message + '\n' || 'Task\'ve been finished\n';

      resultMessage += notifyConfig.taskFinishedText + '<%= options.date %>';

      if (params.notStream) {
        return notify(defaultConfig).write(resultMessage);
      }

      return notify(
        Object.assign(
          defaultConfig, {
            onLast: params.onLast || true,
            message: function () {

              // Scss-files have been compiled
              // Separate js files's been copied
              // Content images've been moved
              if (message == "Scss-files have been compiled") {
                console.log('----------------- css -----------------');
                gulp.src(['./../front_view/dev/static/css/**/*', '!./../front_view/dev/static/**/_*']).pipe(gulp.dest('./../master/frontend/web/static/css'));

              } else if (message == "Separate js files's been copied") {
                console.log('----------------- js -----------------');

                gulp.src(['./../front_view/dev/static/js/**/*', '!./../front_view/dev/static/**/_*']).pipe(gulp.dest('./../master/frontend/web/static/js'));

              } else if (message == "JavaScript has been processed") {
                console.log('----------------- JavaScript -----------------');

                gulp.src(['./../front_view/dev/static/js/**/*', '!./../front_view/dev/static/**/_*']).pipe(gulp.dest('./../master/frontend/web/static/js'));

              } else if (message == "Content images've been moved") {
                console.log('----------------- images -----------------');

                gulp.src(['./../front_view/dev/static/img/**/*', '!./../front_view/dev/static/**/_*']).pipe(gulp.dest('./../master/frontend/web/static/img'));

              } else {
                console.log('----------------- all -----------------');
                gulp.src(['./../front_view/dev/static/**/*', '!./../front_view/dev/static/**/_*']).pipe(gulp.dest('./../master/frontend/web/static'));
              }
              return resultMessage
            },
          }
        )
      );
    }

    return tars.packages.gutil.noop();
  }
};
