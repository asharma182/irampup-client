import tornado
import tornado.ioloop
import tornado.web
import os, uuid
import xlrd
import cx_Oracle

__UPLOADS__ = "uploads/"

class Userform(tornado.web.RequestHandler):
    def get(self):
        self.render("fileuploadform.html")


class Upload(tornado.web.RequestHandler):
    def post(self):
        global cname
        #print(self.request.files)
        fileinfo = self.request.files['myfile'][0]
        #print("fileinfo is", fileinfo)
        original_fname  = fileinfo['filename']
        extn = os.path.splitext(original_fname)[1]
        cname = str(uuid.uuid4()) + extn
        #output_file = open("uploads/" + original_fname, 'wb')
        fh = open(__UPLOADS__ + cname, 'wb')
        fh.write(fileinfo['body'])
        self.finish(cname + " is uploaded!! Check %s folder" %__UPLOADS__)
        #self.write("file uploaded successfully")
        importExcelDataToDb(cname)


def importExcelDataToDb(file):
    connection = cx_Oracle.connect('admin','Welcome@1234','irampupdb_low')
    cursor = connection.cursor()
    query = """INSERT INTO Module (MODULEID,MODULETYPE,QUESTION,ANSWER,MODULETOPIC) VALUES (:MODULEID, :MODULETYPE, :QUESTION, :ANSWER, :MODULETOPIC)"""
    book = xlrd.open_workbook("uploads/" + file)
    sheet = book.sheet_by_index(0)
    sql = """SELECT * FROM (
                SELECT * FROM Module ORDER BY MODULEID DESC
            ) WHERE ROWNUM = 1"""
    id=0
    for result in cursor.execute(sql):
        print(result[0])
    id=result[0] + 1
    for r in range(1,sheet.nrows):
        # MODULETYPE = (sheet.cell(r,0).value).encode('utf-8').strip()
        # QUESTION = (sheet.cell(r,1).value).encode('utf-8').strip()
        # MODULETOPIC = (sheet.cell(r,2).value).encode('utf-8').strip()
        MODULETYPE = str(sheet.cell(r,0).value)
        QUESTION = str(sheet.cell(r,1).value)
        ANSWER =str(sheet.cell(r,2).value)
        MODULETOPIC = str(sheet.cell(r,3).value)
        cursor.execute(query, {'MODULEID': id, 'MODULETYPE': MODULETYPE, 'QUESTION': QUESTION,'ANSWER': ANSWER, 'MODULETOPIC': MODULETOPIC})
        id +=1
    cursor.close()
    connection.commit()
    connection.close()
    print("Data Inserted")


class Userform(tornado.web.RequestHandler):
    def get(self):
        self.render("admin.html", title="Upload Excel")

application = tornado.web.Application([
        (r"/", Userform),
        (r"/upload", Upload),
        ], debug=True)


if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()