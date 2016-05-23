var BOOK_ID = 'BOOK_ID';
var SHEET_NAME = 'SHEET_NAME';

function doGet(request) {

  var bookId = BOOK_ID;
  var sheetName = SHEET_NAME;

  try {
    var book = SpreadsheetApp.openById(bookId);

    var sheet = book.getSheetByName(sheetName);

    var key = request.parameters.key;

    var likeCount = getLikeCountByKey(sheet, key);

    var respJson = [{
      key: key[0],
      count: likeCount
    }];

    return ContentService.createTextOutput(JSON.stringify(respJson)).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    Logger.log(e);
    return ContentService.createTextOutput(JSON.stringify(e)).setMimeType(ContentService.MimeType.JSON);
  }
}


function doPost(request) {

  var bookId = BOOK_ID;
  var sheetName = SHEET_NAME;

  try {
    var book = SpreadsheetApp.openById(bookId);

    var sheet = book.getSheetByName(sheetName);

    var key = request.parameters.key;

    var likeCount = updateLikeCountByKey(sheet, key);

    var respJson = [{
      key: key[0],
      count: likeCount
    }];

    return ContentService.createTextOutput(JSON.stringify(respJson)).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    Logger.log(e);
    return ContentService.createTextOutput(JSON.stringify(e)).setMimeType(ContentService.MimeType.JSON);
  }
}


function getLikeCountByKey(sheet, key) {
  var count = 0;

  //シートが存在しない場合
  //シートが空の場合
  if(!sheet || sheet.getLastColumn() == 0.0 || sheet.getLastRow() == 0.0) {
    return count;
  }

  //対象のkeyのカウントを取得
  var lastRow = sheet.getLastRow();
  for(var rowIndex = 2; rowIndex <= lastRow; rowIndex++) {

    var range = sheet.getRange(rowIndex, 1, 1, 2);
    var values = range.getValues();
    if(values[0][0] == key) {
      count = values[0][1];
      break;
    }
  }

  return count;
}

function updateLikeCountByKey(sheet, key) {
  var count = 0;

  //シートが存在しない場合
  //シートが空の場合
  if(!sheet || sheet.getLastColumn() == 0.0 || sheet.getLastRow() == 0.0) {
    return count;
  }

  //対象のkeyのカウントを取得
  var lastRow = sheet.getLastRow();
  for(var rowIndex = 2; rowIndex <= lastRow; rowIndex++) {

    var range = sheet.getRange(rowIndex, 1, 1, 2);
    var values = range.getValues();
    if(values[0][0] == key) {
      count = values[0][1] + 1;
      //値を更新
      sheet.getRange(rowIndex, 2).setValue(count);
      return count;
    }
  }

  //対象のkeyがない場合は新規作成
  count = count + 1;
  sheet.getRange((lastRow + 1), 1).setValue(key);
  sheet.getRange((lastRow + 1), 2).setValue(count);

  return count;
}
