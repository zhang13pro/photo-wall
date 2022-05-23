const ExifImage = require('exif').ExifImage

/*
 * Utility function to convert exif data into something a bit more consumable
 * by a template
 */
const exif = (staticPath, callback) => {
  try {
    new ExifImage(
      {
        image: staticPath, // photos\杭州-浙江\晚霞.jpg
      },
      (error, data) => {
        if (error) {
          return callback(null, null)
        } else {
          const exifMap = {
            // 相机型号
            Model: data.image.Model || 'unknown',
            // 生成时间
            Time: timeFormatter(data.exif.DateTimeOriginal) || '',
            // 光圈F值
            FNumber: data.exif.FNumber || '',
            // 焦距
            focalLength: data.exif.FocalLength || '',
            // 感光度
            ISO: data.exif.ISO || '',
            // 快门速度
            speed: '1/' + (2 ^ data.exif.ShutterSpeedValue) || '',
            // 闪光灯
            Flash: data.exif.Flash || '',
            // 曝光程序 - 自动曝光、光圈优先、快门优先、M档等
            ExposureProgram: data.exif.ExposureProgram || '',
            // 白平衡
            WhiteBalance: data.exif.WhiteBalance || '',
          }
          return callback(null, exifMap)
        }
      }
    )
  } catch (error) {
    return callback(null, null)
  }
}

function timeFormatter(time) {
  try {
    const res = time.match(/^\d{4}:\d{2}:\d{2}/g, '')[0]

    if (res) {
      let _res = String(res).replaceAll(':', '/')
      let _time = (time.split(' ')[0] = _res).join(' ')
      console.log('time', _time)

      return _time
    }
  } catch (error) {
    throw error
  }
}

module.exports = exif
