
(function () {

  function fnAddButtons() {

    let flag = false;
    let coursesList = new ListCourses();
    let listMessages;
    let listMessages2;

    $.get(chrome.runtime.getURL('popup.html'), function (data) {

      $($.parseHTML(data)).appendTo('body');
      var lastElemnt = document.querySelector('#kt_toolbar_container > div.page-title.d-flex.flex-column.me-3 > div');

      lastElemnt.appendChild(document.getElementById("sentMassages"))
      lastElemnt.appendChild(document.getElementById("break"))
      lastElemnt.appendChild(document.getElementById("onoffbtn"))
      lastElemnt.appendChild(document.getElementById("searchbtn"))
      lastElemnt.appendChild(document.getElementById("upload-study-materials"))

      // lastElemnt.appendChild(document.getElementById("extentionBtn"))

     
      //onclick-extention-search-btn
      document.getElementById("searchbtn").onclick = function () {

        console.log("search-btn clicked");
        var actualCode = "document.dispatchEvent(new CustomEvent('yourSearchEvent', { detail: '' }))";

        document.documentElement.setAttribute('onreset', actualCode);
        document.documentElement.dispatchEvent(new CustomEvent('reset'));
        document.documentElement.removeAttribute('onreset');

        return false;

      };

      //listener-extention-search-btn
      document.addEventListener('yourSearchEvent', function (e) {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "fireflyweb.aspx");
        xhr.onload = function (event) {

          document.body.innerHTML = event.target.response
          document.getElementsByClassName('card g-brd-primary rounded-0')[0].style.display = 'none';
          document.getElementsByClassName('TextAlignCenter')[0].style.visibility = 'hidden';
          document.getElementsByClassName("LocalColor q_title d-flex text-white fw-bolder my-1 fs-1")[0].innerHTML = "חיפוש קורסים מתקדם";
          document.getElementsByClassName("LocalColor breadcrumb breadcrumb-separatorless fw-bold fs-5 my-1 d-print-none")[0].style.visibility = 'hidden';

          dataArrayCourses = ['אבטחת מערכות תוכנה', 'אבטחת מערכת WEB','אוטומטים ושפות פורמליות','אוירודינמיקה של טורבינות רוח','אופטימיזציה הנדסית','אוריינות עברית','אורינות אקדמית - אוגוסט','אותות אקראיים ורעש','אותות ומערכות','אימונולוגיה','אינטגרציה הנדסית ניהולית','אינטגרציה ומצוינות ארגונית','אלגברה לינארית - סביבת מרצים','אלגברה לינארית 1','  אלגברה לינארית 2',' אלגברה ליניארית','אלגברה ליניארית 1','  אלגברה ליניארית 2','אלגוריתמים מבוזרים','אלגוריתמים קוונטים','אלגוריתמיקה 1','שיטות מתמטיות מתקדמות - סביבת מרצים','  שיטות כמותיות בניהול','שיווק, פרסום ומכירות','  שיווק למיזמים טכנולוגיים',' שיווק ופרסום באינטרנט','  שדות אלקטרומגנטיים',' שאילתות באינטרנט','רובוטיקה','ראקטורים',
            'ראיה ממוחשבת','קניין רוחני ביזמות טכנולוגית','קינמטיקה של מנגנונים מכניים','קורס הכנה במתמטיקה','קורס בחירה כללי','  צורות מתן של תרופות','פרויקט גמר הנדסת תוכנה סביבת מרצים','פרויקט גמר בהנדסת תוכנה',' פרויקט גמר בהנדסת ניהול ותפעול','פרויקט גמר בהנדסת מערכות מידע','פרויקט גמר בהנדסת חומרים מתקדמים','  פרויקט גמר בהנדסת אלקטרוניקה',' פרויקט גמר בהנדסה פרמצבטית',' פרויקט גמר',' פרוייקט גמר הנדסת תוכנה - תואר שני','פרוייקט גמר בהנדסת מכונות','פיתוח תוכנה מונחה עצמים',' פיתוח מנשקי אדם מחשב','פיסיקה של מצב מוצק','פיסיקה מעבדה 2','פיסיקה מעבדה','  פיסיקה 2','פיסיקה 1','  פיסיקה של מוליכים למחצה','פיסיולוגיה',' פיזיקה חלק א','פונקציות מרוכבות ואנליזה הרמונית','  פולימרים ויישומיהם בתעשייה הפרמצבטית'
            ,'ערבית מדוברת למתחילים','עקרונות הזרימה','עיבוד תמונה','עיבוד ספרתי של אותות','עיבוד אופטי של תמונות','עברית רמה ג מז"י',' עברית רמה ב מז"י','עברית - רמה ו','עברית - רמה ה',' עבודת מחקר שנתית',' עבודת מחקר שנתית','סמינר מחלקתי - הנדסת תעו"נ','סמינר מחלקתי - הנדסת חשמל ואלקטרוניקה','  סמינר ביזמות טכנולוגית','סימולציית תהליכים','סימולציה ספרתית תעשייתית','סייבר ואבטחת מידע','סטטיקה','סטטיסטיקה יישומית','סטטיסטיקה וביו סטטיסטיקה','  סוגיות הנדסיות וניהוליות ביזמות טכנולוגי','סדנא בתכנות יישומים ניידים באנדרואיד','  סביבת מרצים - סגל היחידה למתמטיקה','סביבת DevOps','ננוטכנולוגיה-חומרים ותהליכים','ניתוח ותכנון מערכות מידע ב','ניתוח ותכנון מערכות מידע א',
            'ניהול פרויקטים','ניהול פרוייקטים','  ניהול משאבי ארגון - ERP','ניהול מערכות תוכנה בענן','  ניהול מערכות ענן','ניהול מיזמים','ניהול מחקר ופיתוח בחברות הנדסיות',' ניהול ושיפור איכות',' נושאים מתקדמים בניהול התפעול','נושאים מתקדמים במערכות תקשורת','נושאים במדעי המחשב','נ"ז תמורת מעורבות חברתית - 2',' נ"ז תמורת מעורבות חברתית - 1',' מתמטיקה מכינה א','מתמטיקה להנדסה','מתמטיקה בדידה 2','מתמטיקה בדידה 1','מתמטיקה בדידה','מתמטיקה 1 - אוגוסט','  מתודולוגיה למצוינות ארגונית','  משוואות דיפרנציאליות חלקיות','  משוואות דיפרנציאליות 2',' משוואות דיפרנציאליות 1','משוואות דיפרנציאליות - סביבת מרצים','משוואות דיפרנציאליות','מציאות רבודה בניהול ותפעול','מצויינות תפעולית מבוססת נתונים',' מערכות תקשורת',
            ' מערכות משובצות מחשב','  מערכות מבוזרות','מערכות ליניאריות','מערכות יצור ממוחשבות','מערכות הפעלה','מערכות האיכות, GMP ורגולציה','מעגלים אלקטרונים ובקרה','מעבר חומר','מעבר חום','מעבדת תקשורת',' מעבדת ניסוי ומדידה','מעבדת מוצקים','מעבדת זרימה ומעבר חום','מעבדה להנדסת תהליכים',' מעבדה בפולימרים','מעבדה במחשבים - מחומרה לתוכנה','מעבדה בטכנולוגיה פרמצבטית תעשייתית','מעבדה באלקטרואופטיקה','  מסיפור משותף לשפה משותפת-לחיות יחד בישרא','מסדי נתונים','מנהיגות הנדסית - מבוא להנדסת מערכת','  מכניקת תנודות וגלים','מכניקת טיס','מכניקת זורמים יישומית','מכניקת זורמים','מכניקה ניסויית','  מכניקה',
            'מיתוג ומערכות ספרתיות','מיקרופרוססורים','מיקרוביולוגיה תעשייתית ותרופות ביופרמצבט','מיקרו מחשבים','מיינדפולנס ולמידה','מטלורגיה פיסיקלית','  מוליכים למחצה','מוח ולמידה - מחקרים חדשניים על למידה','מוזיקה פופולרית בעבר ובהווה','מדע והנדסה של חומרים 2','מדע והנדסה של חומרים 1','מבני נתונים','מבנה וארגון המחשב','מבחן סיווג בפיסיקה','  מבוא מתמטיקה קדם מכינה','מבוא לתכנות מדעי','מבוא לתכנות','מבוא לשרטוט הנדסי - מעבדה','מבוא לפיסיקה - אוגוסט','  מבוא למערכות מידע','  מבוא למיקרוביולוגיה - מעבדה ממוקדת','מבוא למיקרו ביולוגיה - מעבדה מורחבת',' מבוא למדע הנתונים','מבוא לכלכלה','מבוא לכימיה','  מבוא לחשמל ואלקטרוניקה',' מבוא לחדו"א','מבוא להנדסת תוכנה','מבוא להנדסת תהליכים עסקיים','מבוא להנדסת תהליכים'
            ,'מבוא להנדסת חשמל ואלקטרוניקה','מבוא להנדסת חשמל','  מבוא להנדסת חומרים','מבוא להנדסה',' מבוא לביולוגיה של התא','מבוא לאופטיקה מודרנית','מבוא ל VLSI','מאזני אנרגיה','למידת מכונה לעיבוד סיגנלים ותמונות רפואי','למידה חישובית','לינוקס ופייתון עם רספברי פיי',' לוגיקה מתמטית','לוגיקה - סביבת מרצים','כתיבה מדעית וטכנית בפרוייקט','כתיבה מדעית וטכנולוגית','  כריית ידע ולמידת מכונה','כלכלה התנהגותית ותמריצים כספיים',' כלכלה הנדסית ויזמית','כלכלה הנדסית','כלים מתמטיים - סביבת מרצים','כלים מתמטיים','כימיה פיסיקלית','  כימיה סביבתית','כימיה אנליטית פרמצבטית - מעבדה ממוקדת','כימיה אנליטית פרמצבטית - מעבדה מורחבת','  כימיה אנליטית 2 - מעבדה','כימיה אנליטית 2',
            'כימיה אנליטית 1 - מעבדה','כימיה אנליטית 1','כימיה אורגנית פרמצבטית','כימיה אורגנית א','  כימיה אורגנית','  כימיה - מעבדה מתקדמת ממוקדת','כימיה - מעבדה מתקדמת מורחבת','כימיה - מעבדה מתקדמת','יסודות התכנות','יסודות הביולוגיה המולקולרית וההנדסה הגנט','  יסודות הביו המולקולרית וההנדסה הגנטית-מע','יסודות בפרמקוקינטיקה','  יסודות בפרמקולוגיה',' יסודות אופטיקה ביו-רפואית','יישומים מתקדמים באקסל','  יישומים ברשתות נוירונים עמוקות','יישומי תקשורת מחשבים','  טריבולוגיה','טכנולוגיות אינטרנט מתקדמות','טכנולוגיות GIS ומיפוי תשתיות האינטרנט','  טכנולוגיה פרמצבטית תעשייתית','  טיפול במים, שפכים ובוצה - מעבדה','  טיפול במים, שפכים ובוצה','טורבו מכונות','חשמל ומגנטיות',' חשיבה המצאתית בבעיות הנדסיות',
            'חשיבה ביקורתית','חשבונאות תמחיר והמחרה','  חקר ביצועים 2','  חקר ביצועים 1','  חומרים ותהליכים במיקרואלקטרוניקה 3','חומרים ותהליכים במיקרואלקטרוניקה 2','  חומרים ותהליכים במיקרואלקטרוניקה 1','חישוביות וסיבוכיות','  חישוב מקבילי ומבוזר','  חומרים קרמיים','חומרים פולימרים','חומרים להתקנים אלקטרואופטיים','חומרים מרוכבים','  חומרים ואפיונם - מעבדה 4',' חומרים ואפיונם - מעבדה 3 - חלק ב','חומרים ואפיונם - מעבדה 3 - חלק א','  חומרים ואיפיונם - מעבדה 2','חומרים ואיפיונם - מעבדה 1','חוזק חומרים 2','  חוזק חומרים 1','  חדשנות מכוונת עיצוב','חדו"א 2 - סביבת מרצים','חדו"א 2','חדו"א 1 - סביבת מרצים','  חדו"א 1','זרימה דחיסה','  זיהומי קרקע ומי תהום',' זיהום אויר',' ואקום זרימה ופלסמה','התקנים של מוליכים למחצה'
            ,'  התפלת מי ים ומים מליחים','התנהגות ארגונית','הסתברות וסטטיסטיקה 2',' הסתברות וסטטיסטיקה 1','הסתברות וסטטיסטיקה','הסתברות - סביבת מרצים','הסתברות','  הנחיות-פרויקט גמר הנדסת תעו"נ','הנחיות-פרויקט גמר הנדסת תוכנה',
            'הנחיות-פרויקט גמר הנדסה פרמצבטית','הנחיות פרוייקט גמר מכונות','הנחיות פרוייקט גמר הנדסת חומרים','הנחיות פרוייקט גמר הנדסת אלקטרוניקה','הנחיות לפרויקט גמר ביזמות טכנולוגית','הנדסת תוכנה בשירות הקהילה','הנדסת שיטות','הנדסת קורוזיה','הנדסת מערכות','הנדסת חשמל 2 - מעבדה','הנדסת חשמל 1 - מעבדה','הנדסת חומרים ותהליכים',' הנדסת אנוש','הנדסת איכות בתוכנה','הנדסה ביו תהליכית','  המרת אנרגיה','  הכנה לתכנות תעונ- מקוון','הכנה לתכנות - מקוון','הכנה לתואר שני MSc','הכנה בתכנות - אוגוסט','הכנה במתימטיקה - אוגוסט','היבטים משפטיים בפעילות עסקית של חברות הז','הטיפול התרופתי במחלות','הדמית נתונים בתהליכי מחקר ופיתוח','  דינמיקה ובקרה','  דינמיקה','גרפיקה הנדסית 2','  גרפיקה הנדסית 1','גלים ומערכות מפולגות',
            'גלים ואופטיקה','בינה עסקית','בין גבריות לנשיות – מתיאוריות לאקטיביזם','ביולוגיה חישובית','ביוכימיה-מעבדה','ביוכימיה ומיקרוביולוגיה סביבתיים','ביוכימיה','ביוטכנולוגיה וביוראקטורים - מעבדה','בחירת חומרים בתכן מכאני','בדיקת תוכנה','ארכיטקטורה של מחשבים','אסטרטגיה עסקית של יזמויות',' אנרגיה מתחדשת','אנליזת נתונים גאו-מרחבית','אנליזת מבנים','אנליזה וקטורית להנדסה','אנליזה וקטורית - סביבת מרצים','אנליזה וקטורית','אנליזה וקטורית','אנגלית מתקדמים ב','אנגלית מתקדמים א','אנגלית מכינה חלק א','אנגלית טרום בסיסי','אנגלית בסיסי','אנגלית - אוגוסט','אמינות ואבטחת איכות',' אלקטרוניקה תקבילית',' אלקטרוניקה ספרתית','אלקטרוניקה - מעבדה','אלמנטים סופיים'
            ,'אלגוריתמיקה 2','  Logistics And Supply Chains','  Language, Culture and Communication in t',' Introduction to Entrepreneurship 101',' Industry 4','Engineer your entrepreneurship - practic','  DSP של אותות אקראיים','Analytical Pharmaceutical Chemistry','תרמודינמיקה 2','תרמודינמיקה','תקשורת מחשבים',' תקשורת אופטית','  תעשייה וניהול - ערב - סיורים',' תעשייה וניהול - סיורים','תעשייה וניהול - מח"ר - סיורים','תכנית רפא - ע"ש שמריהו לוין - סמינר מחלק','  תכנות מונחה עצמים','תכנות בשפת C ו- C++','  תכנות בסביבת אינטרנט','תכנון פיקוח על היצור 2','תכנון ניסויים סטטיסטיים','  תכנון ותפעול מערכות מים','תכנון ופיקוח על הייצור 1',' תכנון וניהול פרויקטי תוכנה','תכן מפעלים וארגוני שירות','תכן מכני','תכן לוגי מתקדם',
            'תיכון מערכות תוכנה','תיכון מונחה עצמים','  תורת הקוונטים','תורת הניסוי והמדידה','תורת המשחקים במשא ומתן',' תורת הבקרה','תורת האלסטיות','תורת האינפורמציה','תהליכים וטכנולוגיות יצור','תהליכים וטכנולוגיות יצור','  תהליכי עיבוד וייצור מתקדמים ובדיקות אל ה','שיעורי מחכנת','  שימוש בסימולציות לנתוח מערכת','שימוש במערכות מידע גאוגרפיות ככלי לתכנון','  שיטות פיזיקליות לאפיון חומרים','שיטות נומריות','  שיטות מתמטיות מתקדמות בהנדסה'
            ,'  Modern Optics and Lasers','Professional Presentations in English',' Space Engineering','The Dynamics in the Workplace: On-the-Jo',' The Economy of words-Writing for busines',' Was Shakespeare Racist? The Merchant of'];

          dataArrayLectures=['ד"ר אבו עמאר איימן','ד"ר אבישי דוד','אברהמי חן רחל','אדלר אלידעת',' אוברוצקי אושרית',' אופק אלמוג רקפת','יונסי קובי',' יובל רבקה',' יגל ראובן','יאנקונסקו ראובן','טרייטל נח','טריגר לואיס','טפליה גלי',' טנא אברהם','טלשיר עידן','טלבי רופאיזן רות',' טייטלבאום אליענה','טייב אושרית',
          ' טויטו לואיזה','חסלבסקי ויטלי','חסין יהודה','חסונא מוסא','חכמון דגן אמירה','חייט רומן',' חזן יורם',' זעפרן אילן','זנגביל אביגדור',' זלכה מאיר',' זיסמן פיליפ','זילברמן משה','זילברמן חיה','וסרבלט אילה',' ונונו ריקה',' ויצטום דוד',' וויצמן רון','הראל ניסים','הירש זאב','היימן דב','הורוביץ רוני',
          'דרייפוס מיכאל','דנציג נחום','דנן יוסף','דייצמן סבטלנה',' דורון פנחס','דומניס אלון','דוידוב פיני',' דאונינג אנט',' גרסטל לידור',' גרגר סרגיי',' גלעד הוד','גלדשטיין יבגניה',' גילון תמר','גורליק בוריס','גור ערן','גוק עדנה','גולדשטיין מיכל',' גבריאלי רנית','גאבר איה',' בש הלל','ברסקי בנימין','ברסלר איל'
          ,'ברנר מאיה','ברמן מרק',' ברמן אורי','ברכץ דידיה',' ברגמן שלומית','בראון יצחק',' בר אלווירה',' בסקין אהרון שמואל','בסיס עודד',' בנק מרים','בן-טולילה משה','בן נריה אסף','בן מיכאל דוד','בן זאב טל',' בן ארויה אברהם','בלנסי דבורה','בלוך מירון','בלוך מירון','בלאנק גרמי','בכר רחל','ביידרמן יבגני',
          ' בורנשטין אריה','בונזק מעיין',' בוהם אבי','בוברוב דניאל',' בבוך דמיטרי','באש תמר','אריאל רות',' אסייג שלומי','אסולין יעקב',' אנגלברג אלי','אמיתי אסתר',' אללוף מרים','אליאב שמעון','אלטמן בקר רחל',' אלטמן רננה','אינבינדר אינסה',' אילון אדיר','אייזנר נעמה','מר אייזנמן שמאי',' אייזנברג אלכסנדר',
          'אזולאי ויצמן נטאלי','אזולאי דורון',' אוריון עוזי',' אוריאן עדי',
          ' יפרח יצחק','צחק אלי',' ישי אפלבוים בתאל','כהן אמיר','כהן אשרת חנה','כהן דוד',' כהן נועה',' כהן עידית','כהנא אביב','כהן-בלאק שרה','כמון פול','כץ צביקה','כץ-בקרמן קרן',' לבובסקי יורה','לוי אבי','לויאני רננה','פרס חוזה אנטוניו','פרץ אילן','צדיקוביץ דמיטרי','צופי משה','צור חנה','צור-דוד שמרית'
          ,'קאסם היתם','קדם דן','קופר גרלד',' קורדובה יוסף','קזנסקי טראובין ברברה','קיוול עדית','קיטרוסר דניאל','קמחי יחיאל','קמיל (כרמל) ישראל',' שמואלי רן','שלו דבורה',' שישוב סבטלנה',' שטרן כרמית','שטרית אריאל','שטראוס פוריה','שטינמץ אורית',' שטיינבוך ביאנה',' שחר קרולין',' שורץ ירון','שורץ אריאל',
          'שבתאי רוזה','רסקין ארתור',' רסין עמנואל',' ריגר חייבי אפרת',' ריבניקוב פרידה טטיאנה','רזניק נעמי','רזווג מאיר','רז שרה',' רוס דבורה','רוזנפלד טטיאנה',' רוזנברג טוביה','רגב דלית',' רבינוביץ אירה הש',' רביד ארז',' רביב מיכאל',' ראם טלי','קשי גיא','קרניאל נועה','קריצבסקי אנסטסיה','קריטי ישראל',
          'קרויטורו-סדגר צוף',' קסל דוד פנחס',' קסל דוד פנחס','פרנקל מיכאל','רידמן שירה דבורה','פרידמן לירון',' פרומין מיטיה','פסרמן-יוזפוב לאה','פנחסי עדאל','פנחסי טל','פיש כץ אליסון',' פינקלשטיין יעקב','פינק אליסון','פינטו גבי','פורמן איתי','פורטמן דניאל','ענבר קובי','ענבל אסנת','עהרנרייך שרה',' סרף שמעון'
          ,' ספז רות',' ספדי מחמוד',' סנדיק מאיר','סיגרון מוריה','סולומיאק ריטה','סדובסקי ערן','נתשה הבה','נתנזון מרים',' נפחא רחל','ניר אסנת','ניאזוב שירן','נחום רויטל','נזיחובסקי יעקב','נוימן יגאל','נוזרין אירנה','נאשף עומר','נאמן הדס',' נאור מיכאל','מרצבך חגי',' מרסיאנו שגיא','מרגי יוהן','מרגוליס גנאדי'
          ,'מנדלבאום פנחס',' מכללה כללי','מילר זמיר יהודית','מיזל אוריה','מזרחי אסתר','מזרחי אילנה','מזכירות תכלית','מורוז בוריס','מורדוך אברהם','מוזפר קוסאי','לשם עמיר','לשם גיא','לצטר יעל',' לסט חגית',' לנדיס חנה',' לילינטל סיון','לורנץ מרים','לוריא צור','לוינסקי רונית','לוין לביאה',
          ,' תבור שי',' שפר עידו','שפנייר אסף','שמש מאיה','שמר אמיר']


          let combinedArray = dataArrayCourses.concat(dataArrayLectures);
  
          $('<input>').attr({
            type: 'text',
            id: 'autocomplete',
            autocomplete: 'off'

          }).appendTo('form');


          $('<button>').attr({
            type: 'submit',
            id: 'submit',
            name: 'submit',
            value: 'Submit'

          }).appendTo('form');
          

          $("#autocomplete").autocomplete({
            source: function (request, response) {
              // filter the data and return the suggestions
              let filteredData = combinedArray.filter(function(item) {
                  return item.toLowerCase().indexOf(request.term.toLowerCase()) !== -1;
              });
              response(filteredData);
            },
             minLength: 0,
             delay: 0
          });

          //submit-click
          $("#submit").click(function () {
            
            console.log("submit-click")

            var table = ``;
            $('.table-responsive').append(table);
            let input = $("#autocomplete").val();

            //requestAllCoursesByNameEvent
            document.addEventListener('requestEvent', function (e) {

              var xhr = new XMLHttpRequest();
              xhr.open("POST", "fireflyweb.aspx");
              xhr.onload = function (event) {
                var htmlResObj = $.parseHTML(event.target.response);
                data = $(htmlResObj).find("#myTable0 > tbody > tr:nth-child(3) > td:nth-child(3) > input")
                a = data.attr('onclick').replace(/[()]/g, '').split(',');
                console.log("a" + a)
                tz = a[3].replace(' ', '+').replace(/'/g, '');
                token = a[4];
                console.log("tz: " + tz + " token: " + token)
                //new Date().getFullYear()+1 OR 2023 ??
                debugger
                var table = `<div class="tableDiv">
                <table class="table table-striped table-bordered TableDefault SortMe dataTable no-footer" id="myTable0" role="grid" aria-describedby="myTable0_info">
                  <tbody>`;
                table += `<th class="sorting" tabindex="0" aria-controls="myTable0" rowspan="1" colspan="1" aria-label="קוד קורס: מיון סדר עולה" style="width: 122.25px;">פרטי הקורס</th><th class="sorting"
                                  tabindex="0" aria-controls="myTable0" rowspan="1" colspan="1" aria-label="שם קורס: מיון סדר עולה" style="width: 150.984px;">שם קורס</th><th class="sorting" tabindex="0" aria-controls="myTable0"
                                    rowspan="1" colspan="1" aria-label="שעות הקורס: מיון סדר עולה" style="width: 340.594px;"> שעות הקורס
                                  <th class="sorting" tabindex="0" aria-controls="myTable0" rowspan="1" colspan="1" aria-label="Link: מיון סדר עולה" style="width: 150px;">פרטי הקורס</th> 
                        </th>`;
                
                for (let year = 2017; year < new Date().getFullYear() + 1; year++) {

                    if(dataArrayCourses.includes(input)){
                      requestAllCoursesByName(tz,token,encodeURI(input),year);
                    }
                    else{
                      inputArray = input.split(' ');
                      lectureLastName = inputArray[0];
                      lectureFirstName = inputArray[1];
                      requestAllCoursesByLectureName(tz, token, encodeURI(lectureLastName), year, lectureLastName + ' ' + lectureFirstName);
                    }

                  }

                  table += `</tbody></table></div>`;
                  $('.table-responsive').append(table);

              };
              var formData = new FormData();
              formData.append("prgname", 'MenuCall_Teacher');
              formData.append("arguments", '-N,-N,-N6,');
              xhr.send(formData);
            });

            var actualCode = "document.dispatchEvent(new CustomEvent('requestEvent', { detail: '' }))";

            document.documentElement.setAttribute('onreset', actualCode);
            document.documentElement.dispatchEvent(new CustomEvent('reset'));
            document.documentElement.removeAttribute('onreset');

            //organizeDataInList
            document.addEventListener('organizeDataInListEvent', function (dataArray) {

              console.log("organizeDataInListEvent");
              console.log(dataArray);
              debugger
              tz1 = tz
              tz1 = tz1.split("+")[1];
              tokenTemp = token;
              tokenTemp = tokenTemp.substr(2);
              var link = `fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {"headers": {"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7","cache-control": "max-age=0","content-type": "application/x-www-form-urlencoded","sec-ch-ua-mobile": "?0","sec-fetch-dest": "document","sec-fetch-mode": "navigate","sec-fetch-site": "same-origin","sec-fetch-user": "?1","upgrade-insecure-requests": "1"},"referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx","referrerPolicy": "strict-origin-when-cross-origin","body": "APPNAME=&PRGNAME=Student_Enter_Course&ARGUMENTS=-N0` + tz1 + `%2C-N0` + tokenTemp + `%2C-N` + dataArray.detail[5] + `%2C-N1%2C-N` + dataArray.detail[3] + `%2C-N+++0%2C-N++` + dataArray.detail[4] + `%2C-N+++1%2C-A%D7%9E%2C-A%2C-A%2C-A%2C-A%2C-A%2C%2C-A%2C-N99","method": "POST","mode": "cors","credentials": "include"}).then(response => response.text()).then(data => {document.body.innerHTML = data});`;

              const course = new Course(dataArray.detail[0], dataArray.detail[1], dataArray.detail[2], link);
              console.log(course);
              coursesList.addCourseTolist(course)

              console.log(coursesList);
              var container = document.getElementById("table-responsive");
              var submit = document.getElementsByName("submit"); // The button itself with an ID of 'btn'

              for (var i = 0; i < coursesList.listCourses.length; i++) {
                var object = coursesList.listCourses[i];

                table += `<tr class="TextAlignRight even" role="row">
                        <td>${object.details}</td>
                          <td>${object.location}</td>
                          <td>${object.time}</td>
                          <td><button class="btn btn-primary" onClick="location.href='${object.link}'">Link</button></td>
                 </tr>`;
              }
              $('.table-responsive').append(table);

              submit.style = {
                backgroundColor: "red",
                color: "white",
                fontSize: "20px",
                padding: "10px"
              };

              const newButton = `<h3>This is the text which has been inserted by JS</h3>`; // New button to be inserted
              submit.innerHTML = '<h1>New Content</h1>';

            });

            return false
          });

        };
        var formData = new FormData();
        formData.append("prgname", 'MenuCall_Teacher');
        formData.append("arguments", '-N,-N,-N6,');
        xhr.send(formData);

      });

      //onclick-extention-on-off-btn
      document.getElementById("onoffbtn").onclick = function () {

        console.log("-on-off-btn clicked");
    //     let modal3= onoffbtn.getAttribute("data-modal");
    //     document.getElementById(modal3).style.display = "block";
    //     var toggleButton = document.getElementById("toggle-button");
    //       var bar = document.getElementById("bar");
    //       var on = false;

    //       toggleButton.addEventListener("click", function() {
    //         on = !on;
    //         if (on) {
    //           toggleButton.innerHTML = "On";
    //           toggleButton.classList.add("on");
    //           bar.classList.add("on");
    //         } else {
    //           toggleButton.innerHTML = "Off";
    //           toggleButton.classList.remove("on");
    //           bar.classList.remove("on");
    //         }
    //       });
    //     let closeBtns2 = [...document.querySelectorAll(".close")];
    //     closeBtns2.forEach(function (btn3) {
          
    //     btn3.onclick = function () {
          
    //         let modal3 = btn3.closest(".modal");
    //         modal3.style.display = "none";
    //       };
    //     });
    //   return false;
    // }; 

        if (!flag)
          flag = true
        else
          flag = false

        var actualCode = "document.dispatchEvent(new CustomEvent('yourOnOffEvent', { detail: '' }))";

        document.documentElement.setAttribute('onreset', actualCode);
        document.documentElement.dispatchEvent(new CustomEvent('reset'));
        document.documentElement.removeAttribute('onreset');

        return false;

      };

      //listener-extention-on-off-btn
      document.addEventListener('yourOnOffEvent', function (e) {
        console.log("yourOnOffEvent " + e)

        setTimeout(() => {
          console.log("Delayed for 1 second.");
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "fireflyweb.aspx");
          xhr.onload = function (event) {

            console.log("keep-alive")
          };
          var formData = new FormData();
          formData.append("prgname", 'MenuCall_Teacher');
          formData.append("arguments", '-N,-N,-N137,');
          xhr.send(formData);
        }, "1 second")

      });

      //onclick-extention-sent-massages-btn
      document.getElementById("sentMassages").onclick = function () {

    //     let modal2 = sentMassages.getAttribute("data-modal");
    //       document.getElementById(modal2).style.display = "block";
    //       document.getElementById("fruit-form").style.display = "block";

    //     function createOptions(listMessages) {
    //     const container = document.getElementById("caption1");
    //     container.innerHTML = "";

    //     // Create the caption element
    //     const caption = document.createElement("p");
    //     caption.setAttribute("id", "caption");
    //     caption.textContent = "בחר את הקורסים הרצויים לשליחת ההודעה :";
    //     container.appendChild(caption);





    //     // Loop through the list of fruits and create the label and checkbox for each one
    //     for (let i = 0; i < listMessages.length; i++) {
    //       const message = listMessages[i];
    //       const label = document.createElement("label");
    //       label.setAttribute("for", message.uniq);
    //       label.textContent = message.name;
    //       container.appendChild(label);

    //       // Create a line break
    //       const br = document.createElement("br");
    //       container.appendChild(br);

    //       // Create the checkbox input element
    //       const checkbox = document.createElement("input");
    //       checkbox.setAttribute("type", "checkbox");
    //       checkbox.setAttribute("id", message.uniq);
    //       checkbox.setAttribute("name", "subjects[]");
    //       checkbox.setAttribute("value", message.uniq);
    //       container.appendChild(checkbox);

    //       // Create the span element to display the group
    //       const groupSpan = document.createElement("span");
    //       groupSpan.setAttribute("class", "group-name");
    //       groupSpan.textContent = `(${message.group})`;
    //       container.appendChild(groupSpan);
    //   }


    // // Create the close button
    // const closeButton = document.createElement("button");
    // closeButton.setAttribute("type", "button");
    // closeButton.setAttribute("id", "close-button");
    // closeButton.textContent = "הבא";
    // container.appendChild(closeButton);

    // // Add event listener to the close button
    // closeButton.addEventListener("click", closeForm);


// const listMessages = [
//   {
//     "tz": "27705250",
//     "uniq": "97630009632464",
//     "year": 2020,
//     "semester": 1,
//     "group": "280020101",
//     "subGroup": 0,
//     "subject": "0028002",
//     "subjectType": 1,
//     "name":"מסדי נתונים"
// },
// {
//     "tz": "27705250",
//     "uniq": "97630009632464",
//     "year": 2020,
//     "semester": 1,
//     "group": "280200101",
//     "subGroup": 0,
//     "subject": "0028020",
//     "subjectType": 1,
//     "name":"מסדי נתונים"
// },
// {
//     "tz": "27705250",
//     "uniq": "97630009632464",
//     "year": 2020,
//     "semester": 3,
//     "group": "810040301",
//     "subGroup": 0,
//     "subject": "0081004",
//     "subjectType": 1,
//     "name":"מסדי נתונים"
// }
// ];

// createOptions(listMessages);

        // let selectedSubjects = [];

        //     function closeForm() {
        //     let subjects = document.querySelectorAll('input[name="subjects[]"]:checked');
        //     selectedSubjects = [...subjects].map(subject => subject.value);
        //     console.log(selectedSubjects);



        //     document.getElementById("fruit-form").style.display = "none";
        //     document.getElementById("modal2").style.display = "none";
        // }


        //   let closeBtns2 = [...document.querySelectorAll(".close")];
        //   closeBtns2.forEach(function (btn2) {
            
        //   btn2.onclick = function () {
            
        //       let modal2 = btn2.closest(".modal");
        //       modal2.style.display = "none";
        //     };
        //   });

        // console.log("sent-massages clicked");
        // listMessages = new ListMessages();

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "fireflyweb.aspx");
        xhr.onload = function (event) {
          var htmlResObject = $.parseHTML(event.target.response);
          data = $(htmlResObject).find("#myTable0 > tbody > tr:nth-child(3) > td:nth-child(3) > input")
          a = data.attr('onclick').replace(/[()]/g, '').split(',');
          console.log("a" + a)
          tz = a[3].replace(' ', '+').replace(/'/g, '');
          token = a[4].replace('-N', '');;
          tzTemp = tz.replace('-N+', '');
          console.log("requestSentMessage " + tzTemp + "," + token + "," + 2020 + "," + 1 + "," + 280020101 + "," + 0000 + "," + 0028002 + "," + 1 + "," + tzTemp)

          year = 2020;
          fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7",
              "cache-control": "max-age=0",
              "content-type": "application/x-www-form-urlencoded",
              "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Linux\"",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1"
            },
            "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "APPNAME=&PRGNAME=MenuCall_Teacher&ARGUMENTS=-N+" + tzTemp + "%2C-N" + token + "%2C-N5%2CR1C3%2C-N+" + tzTemp + "%2CR1C9%2CR1C4&R1C3=" + year + "&R1C9=0&R1C4=A",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
          }).then(response => response.text())
            .then(data => {
              var htmlResOb = $.parseHTML(data);
              var rows = $(htmlResOb).find("[id^=myTable0]").find("tr")
              var columns;
              var array = [];

              for (var i = 1; i < rows.length; i++) {

                columns = $(rows[i]).find('td');
                for (var j = 0; j < columns.length; j++) {
                  if (j == 2) {
                    if (columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ') == 'א ') {
                      array[0] = 1
                    }
                    else if (columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ') == 'ב ') {
                      array[0] = 2
                    }
                    else {
                      array[0] = 3
                    }
                  }
                  if (j == 3) {
                    array[1] = '00' + columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ')[2]
                  }
                  if (j == 5) {
                    array[2] = columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ')[0].split(' ')[0]
                  }
                  if (j == 10) {
                    array[3] = columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ')[2].split('/')[2].split('  ')[0]
                  }
                }
                //const message = new Message(tzTemp,token,array[3],array[0],array[2],array[1])
                const message = new Message(tzTemp, token, array[0], array[2], array[1])
                listMessages.addMessageTolist(message);
              }
              debugger
              console.log(listMessages);
              requestSentMessage(listMessages);
            });

        };
        var formData = new FormData();
        formData.append("prgname", 'MenuCall_Teacher');
        formData.append("arguments", '-N,-N,-N6,');
        xhr.send(formData);


        // var actualCode ="document.dispatchEvent(new CustomEvent('yourSentMassagesEvent', { detail: '' }))";

        // document.documentElement.setAttribute('onreset', actualCode);
        // document.documentElement.dispatchEvent(new CustomEvent('reset'));
        // document.documentElement.removeAttribute('onreset');

        return false;

      };

      //listener-extention-sent-massages-btn
      document.addEventListener('yourSentMassagesEvent', function (e) {
        console.log("yourSentMassagesEvent " + e)
      });

      //onclick-extention-upload-study-materials-btn
      document.getElementById("upload-study-materials").onclick = function () {

        console.log("upload-study-materials clicked");
        //TODO
        listMessages2 = new ListMessages();

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "fireflyweb.aspx");
        xhr.onload = function (event) {
          var htmlResObject = $.parseHTML(event.target.response);
          data = $(htmlResObject).find("#myTable0 > tbody > tr:nth-child(3) > td:nth-child(3) > input")
          a = data.attr('onclick').replace(/[()]/g, '').split(',');
          console.log("a" + a)
          tz = a[3].replace(' ', '+').replace(/'/g, '');
          token = a[4].replace('-N', '');;
          tzTemp = tz.replace('-N+', '');

          year = 2020;
          fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7",
              "cache-control": "max-age=0",
              "content-type": "application/x-www-form-urlencoded",
              "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Linux\"",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1"
            },
            "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "APPNAME=&PRGNAME=MenuCall_Teacher&ARGUMENTS=-N+" + tzTemp + "%2C-N" + token + "%2C-N5%2CR1C3%2C-N+" + tzTemp + "%2CR1C9%2CR1C4&R1C3=" + year + "&R1C9=0&R1C4=A",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
          }).then(response => response.text())
            .then(data => {
              var htmlResOb = $.parseHTML(data);
              var rows = $(htmlResOb).find("[id^=myTable0]").find("tr")
              var columns;
              var array = [];

              for (var i = 1; i < rows.length; i++) {

                columns = $(rows[i]).find('td');
                for (var j = 0; j < columns.length; j++) {
                  if (j == 2) {
                    if (columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ') == 'א ') {
                      array[0] = 1
                    }
                    else if (columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ') == 'ב ') {
                      array[0] = 2
                    }
                    else {
                      array[0] = 3
                    }
                  }
                  if (j == 3) {
                    array[1] = '00' + columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ')[2]
                  }
                  if (j == 5) {
                    array[2] = columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ')[0].split(' ')[0]
                  }
                  if (j == 10) {
                    array[3] = columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ')[2].split('/')[2].split('  ')[0]
                  }
                }
                //const message = new Message(tzTemp,token,array[3],array[0],array[2],array[1])
                const message = new Message(tzTemp, token, array[0], array[2], array[1])
                listMessages2.addMessageTolist(message);
              }
              console.log(listMessages2);
              requestUpLoadStudyMaterials(listMessages2);
            });

        };
        var formData = new FormData();
        formData.append("prgname", 'MenuCall_Teacher');
        formData.append("arguments", '-N,-N,-N6,');
        xhr.send(formData);
        // var actualCode ="document.dispatchEvent(new CustomEvent('yourUploadStudyMaterialsEvent', { detail: '' }))";

        // document.documentElement.setAttribute('onreset', actualCode);
        // document.documentElement.dispatchEvent(new CustomEvent('reset'));
        // document.documentElement.removeAttribute('onreset');

        return false;

      };

      //listener-extention-upload-study-materials-btn
      document.addEventListener('yourUploadStudyMaterialsEvent', function (e) {
        console.log("yourUploadStudyMaterialsEvent " + e)
        //TODO
      });

    });

  }

  function requestAllCoursesByName(tz, token, courseName, year) {

    fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,he;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "APPNAME=&PRGNAME=LOOK_FOR_NOSE_AB_Site&ARGUMENTS=" + tz + "%2C" + token + "%2C%2C-N%2C-A%2CR1C3%2C%2CR1C6%2CR1C7&R1C1=&R1C7=" + courseName + "&R1C2=1&R1C13=1&R1C14=&R1C5=0&R1C3=" + year + "&R1C6=0",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    })
      .then(response => response.text())
      .then(data => {

        var htmlResObj = $.parseHTML(data);

        var rows = $(htmlResObj).find("[id^=myTable]")
        var columns;
        for (var i = 0; i < rows.length; i++) {
          columns = $(rows[i]).find('td');
          for (var j = 0; j < columns.length; j++) {
            if (j % 3 == 0)//move on the code
            {
              tzTemp = tz;
              tzTemp = tzTemp.replace('+', '');

              var xhr = new XMLHttpRequest();
              xhr.open("POST", "fireflyweb.aspx");
              xhr.onload = function (event) {

                // document.body.innerHTML = event.target.response
                var htmlResObj = $.parseHTML(event.target.response);
                console.log(htmlResObj)
                data = $(htmlResObj).find("[id^=MyFather]")
                for (var k = 0; k < data.length; k++) {
                  var d = data[k].innerText
                  dataArray = d.replace(/\r?\n?\t|\r/g, "").split(',');
                  var data2 = dataArray
                  document.dispatchEvent(new CustomEvent('organizeDataInListEvent', { detail: data2 }));
                }

              };
              var formData = new FormData();
              formData.append("prgname", 'List_Of_Courses');
              console.log(tzTemp + ',' + token + ',-N0,-A,-N' + $(columns[j]).html() + ',-N0,-Aנ,-N' + year);
              formData.append("arguments", tzTemp + ',' + token + ',-N0,-A,-N' + $(columns[j]).html() + ',-N0,-Aנ,-N' + year);
              xhr.send(formData);

            }
          }
        }

      });
  }

  function requestAllCoursesByLectureName(tz, token, lectureLastName, year, fullLectureName) {

    console.log("requestAllCoursesByLectureName " + token)

    fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Linux\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "APPNAME=&PRGNAME=LOOK_FOR_Teacher_AB_Site&ARGUMENTS=-N+" + tz + "%2C" + token + "%2C%2C-N%2C-AH%2CR1C3%2CR1C6%2CR1C14&R1C1=&R1C7=&R1C2=1&R1C13=1&R1C14=" + lectureLastName + "&R1C5=0&R1C3=" + year + "&R1C6=0",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    })
      .then(response => response.text())
      .then(data => {

        console.log("LOOK_FOR_Teacher_AB_Site");

        // document.body.innerHTML = data
        var htmlResObj = $.parseHTML(data);
        var rows = $(htmlResObj).find("[id^=myTable]")
        var columns;
        for (var i = 0; i < rows.length; i++) {
          columns = $(rows[i]).find('td');
          for (var j = 0; j < columns.length; j++) {

            let name = columns[j].innerText.replace(/\r?\n?\t|\r/g, "").split(' ')
            if (name[1] + ' ' + name[2] == fullLectureName) {

              tzTemp = tz;
              tzTemp = tzTemp.replace('+', '');

              var xhr = new XMLHttpRequest();
              xhr.open("POST", "fireflyweb.aspx");
              xhr.onload = function (event) {

                // document.body.innerHTML = event.target.response
                var htmlResObj = $.parseHTML(event.target.response);
                console.log(htmlResObj)
                data = $(htmlResObj).find("[id^=MyFather]")
                for (var k = 0; k < data.length; k++) {
                  debugger
                  var l = data[k]
                  var d = data[k].innerText
                  dataLink = l.innerHTML.split("onclick=")[2].split(",");
                  var group = dataLink[7];
                  var year = dataLink[5].substr(2);
                  var numCourse = dataLink[9].split("  ")[1];
                  dataArray = d.replace(/\r?\n?\t|\r/g, "").split(',');
                  var data2 = dataArray
                  var data3 = [data2.length + 3]
                  for (var j = 0; j < data2.length; j++) {
                    data3[j] = data2[j];
                  }
                  data3[data2.length] = group.substr(2);
                  data3[data2.length + 1] = numCourse
                  data3[data2.length + 2] = year

                  document.dispatchEvent(new CustomEvent('organizeDataInListEvent', { detail: data3 }));
                }

              };
              var formData = new FormData();
              formData.append("prgname", 'List_Of_Courses');
              arg = $(columns[j + 1]).html().replace(/\r?\n?\t|\r/g, "").split(',')[6];
              formData.append("arguments", tzTemp + ',' + token + ',-N0,-A,-N0,' + arg + ',,-N' + year);
              xhr.send(formData);
              break;
            }
          }
        }

      });

  }

  function requestSentMessage(listMessages) {
    fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Linux\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "APPNAME=&PRGNAME=Teacher_Update_Massege&ARGUMENTS=TZ%2CUNIQ%2CYear%2CSemester%2CGroup%2CSub_Group%2CSubject%2CSubject_Type%2C-N0%2CTeacher_ID&TZ=" + listMessages.listMessages[0].tz + "&UNIQ=" + listMessages.listMessages[0].uniq + "&Year=" + listMessages.listMessages[0].year + "&Semester=" + listMessages.listMessages[0].semester + "&Group=" + listMessages.listMessages[0].group + "&Sub_Group=" + listMessages.listMessages[0].subGroup + "&Subject=" + listMessages.listMessages[0].subject + "&Subject_Type=" + listMessages.listMessages[0].subjectType + "&Teacher_ID=+" + listMessages.listMessages[0].tz + "&Population_Type=%D7%9E&Lang=H&myTable1_length=10&R1C1=0&general_cmd21=0&general_cmd_datetime21=&general_cmd_studyunits21=-1&general_cmd_publish21=-1&general_cmd38=0&general_cmd_datetime38=&general_cmd_studyunits38=-1&general_cmd_publish38=-1&general_cmd81=0&general_cmd_datetime81=&general_cmd_studyunits81=-1&general_cmd_publish81=-1&general_cmd125=0&general_cmd_datetime125=&general_cmd_studyunits125=-1&general_cmd_publish125=-1&general_cmd73=0&general_cmd_datetime73=&general_cmd_studyunits73=-1&general_cmd_publish73=-1&general_cmd1=0&general_cmd_datetime1=&general_cmd_studyunits1=-1&general_cmd_publish1=-1&general_cmd6=0&general_cmd_datetime6=&general_cmd_studyunits6=-1&general_cmd_publish6=-1&general_cmd10=0&general_cmd_datetime10=&general_cmd_studyunits10=-1&general_cmd_publish10=-1&myTable5_length=10&myTable6_length=10&myTable56_length=10&PercentageOfFailuresPerStudentForReport=0",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    })
      .then(response => response.text())
      .then(data => {
        debugger
        data = data.replaceAll(`onClick=\"SubmitForm(this, '','Teacher_Massege_In','TZ,UNIQ,Year,Semester,Group,Sub_Group,Subject,Subject_Type,Massege_code,R1C1,R1C2,R1C3,R1C4,,,R1C5,R1C6,Teacher_ID,R1C14,R1C16,R1C20','');\">\t\t\r\n\t\t\t\t\t\t\t\r\n\t\t`, "onclick =\"yourFunction();\">\t\t\r\n\t\t\t\t\t\t\t\r\n\t\t")
        document.open();
        document.write(data);
        document.write(`<script>
          async function yourFunction(){
              
              var FileData;

              $('.jqfileupload').each(function(e){	
                var w = $(this).closest('div').width();
                if (w == 0) {
                  $(this).closest('div').css('background-position','center center');
                } else {
                  w = w-318-95; /* 318 for image width, 95 for button width */
                  if (w<0) {
                    $(this).closest('div').css('background-image','inherit');
                  } else {
                    var val = parseInt(w/2)+'px center';
                    $(this).closest('div').css('background-position',val);
                  }
                }
                
                var jqid = '#'+$(this).parent().parent().parent().attr('id');
                var jqid_num = jqid.replace('#jqupload','');		
                var dropZoneElement;
                var dropZoneElement = $(".dropZoneElement"+jqid_num);
                $(this).fileupload({			
                  autoUpload: true,
                  formData: {
                    arg: jqid_num
                  },
                  filesContainer : $(this).find("tbody.files"),
                        dropZone : dropZoneElement,
                  maxChunkSize: 20000000, // 20 MB
                  sequentialUploads: true,
                  maxNumberOfFiles: 1,
                  limitConcurrentUploads: 1,		
                  url: 'https://yedion.jce.ac.il/yedion/fileupload.aspx',
                  dataType: 'json',
                  add: function(e, data) {
                    alert("add");
                    alert("ggggggggggjjjjjjjjjjjj");
                    FileData = data;
                    alert(dataFile1);
                      $('#allowsubmit').val('N');
                      var uploadErrors = [];
                      var FilePrefAllowed = $('#FilePrefAllowed').val();
                      if (FilePrefAllowed!=null)
                      {
                        FilePrefAllowed = FilePrefAllowed.toLowerCase();
                        var fileExtension = data.originalFiles[0].name.substr((data.originalFiles[0].name.lastIndexOf('.') + 1)).toLowerCase();
                        var FilePrefAllowedItems = FilePrefAllowed.split(/\s*,\s*/);
                        var isAllowedFile = FilePrefAllowedItems.indexOf(fileExtension) > -1;
                        if (!isAllowedFile)
                        {
                          FilePrefAllowedA=replaceAll(FilePrefAllowed,",","/");
                          uploadErrors.push("<li>"+FilePrefAllowedItemsMessage+" "+FilePrefAllowedA+" "+FilePrefAllowedItemsMessageMore+"</li>");
                        }
                      }
                      var FileSizeMax = $('#FileSizeMax').val();
                      if (FileSizeMax!=null)
                      {
                        var fileSize = data.originalFiles[0]['size'];
                        fileSize = parseInt(fileSize/1024);
                        if(fileSize >= parseInt(FileSizeMax)) {
                          uploadErrors.push("<li>"+FileSizeMaxMessage+' '+parseInt(FileSizeMax/1000)+' MB')+"</li>";
                        }
                      }
                      if(uploadErrors.length > 0) {
                        $('.alertModal #title').html(uploadErrorsMessage);
                        $('.alertModal #desc').html("<ul>"+uploadErrors.join("<br>")+"</ul>");
                        $('.alertModal').modal('show');
                      } else {
                        alert("submit");
                        data.submit();
                        alert(data);
                      }
                  },
                  done: function (e, data) {
                    $('#allowsubmit').val('Y');
                    $(jqid+' .progress').hide();
                    $.each(data.result.files, function (index, file) {
                      var url = '<div style="float:right;"><a target="_blank" style="margin-top:0 !important;" class="btn btn-md u-btn-primary btn-primary rounded g-mb-12" href="'+file.url+'">'+view_txt+': '+file.name+'</a></div>';
                      var db = '<div style="float:left;"><input type="button" class="btn btn-md u-btn-primary btn-primary rounded g-mb-12 btn-danger delete_file" value="'+delete_txt+'" data-deleteurl="'+file.delete_url+'" /></div>';
                      $(jqid+' .files').html('<div>'+db+url+'</div>');
                    });
                    $(jqid+' .delete_file').click(function(e){
                      var delete_url = $(this).data('deleteurl');
                      $.ajax({
                        type: "POST",
                        async: false,
                        url: delete_url,
                        data: "",
                        contentType: "application/json; charset=utf-8",
                        error: function (XMLHttpRequest, textStatus, errorThrown) { },
                        success: function (result) {
                          $(jqid+' .fileUploadPH').show();
                          $(jqid+' .files').html('');
                        }
                        });
                    });
                  },
                  progressall: function (e, data) {
                    $(jqid+' .fileUploadPH').hide();
                    $(jqid+' .progress').show();
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $(jqid+' #progress'+jqid_num+' .progress-bar').css(
                      'width',
                      progress + '%'
                    );
                    
                    $(jqid+' #progress'+jqid_num+' .progressVal').html(progress+'%');
                  }
                }).prop('disabled', !$.support.fileInput)
                  .parent().addClass($.support.fileInput ? undefined : 'disabled').on('fileuploaddrop',function(e,data){
                    if (data.files.length>1) {
                      alert('לא ניתן לטעון יותר מקובץ אחד');
                      e.preventDefault();
                    }
                  });
              }); 

              class Message{

                tz
                uniq
                ////remove
                year = 2020 
                semester
                group
                subGroup = 0000
                subject
                subjectType = 1
  
                constructor(tz,uniq,semester,group,subject)
                {
                    this.tz  = tz;
                    this.uniq = uniq;
                    // this.year = year;
                    this.semester = semester;
                    this.group = group;
                    this.subject = subject;
                }
  
              }

              listMessages = ${listMessages.toCodeArray()}

              title = encodeURI($("#R1C1").val());
              message = encodeURI($("#R1C2").val());
  
              for(var i = 0; i<listMessages.length; i++){

                alert(FileData);
                if(FileData!=undefined){
                  if(i!=0 && i<=listMessages.length){
                    alert(i)
                    await FileData.submit();
                    alert(FileData);
                  }
                }
  
              await fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
                  "headers": {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7",
                    "cache-control": "max-age=0",
                    "content-type": "application/x-www-form-urlencoded",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1"
                  },
                  "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
                  "referrerPolicy": "strict-origin-when-cross-origin",
                  "body": "APPNAME=&PRGNAME=Teacher_Massege_In&ARGUMENTS=TZ%2CUNIQ%2CYear%2CSemester%2CGroup%2CSub_Group%2CSubject%2CSubject_Type%2CMassege_code%2CR1C1%2CR1C2%2CR1C3%2CR1C4%2C%2C%2CR1C5%2CR1C6%2CTeacher_ID%2CR1C14%2CR1C16%2CR1C20&TZ=+"+listMessages[i].tz+"&UNIQ="+listMessages[i].uniq+"&Year="+listMessages[i].year+"&Semester="+listMessages[i].semester+"&Group="+listMessages[i].group+"&Sub_Group=+++"+listMessages[i].subGroup+"&Subject=++"+listMessages[i].subject+"&Subject_Type=+++"+listMessages[i].subjectType+"&Massege_code=++++++++0&Teacher_ID=+"+listMessages[i].tz+"&R1C1="+title+"&R1C2="+message+"&files=&arg=1&files1=&R1C3=03%2F04%2F2023&R1C5=2&R1C6=2&R1C14=0",
                  "method": "POST",
                  "mode": "cors",
                  "credentials": "include"
                });
              }
              fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
                "headers": {
                  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7",
                  "cache-control": "max-age=0",
                  "content-type": "application/x-www-form-urlencoded",
                  "sec-ch-ua-mobile": "?0",
                  "sec-fetch-dest": "document",
                  "sec-fetch-mode": "navigate",
                  "sec-fetch-site": "same-origin",
                  "sec-fetch-user": "?1",
                  "upgrade-insecure-requests": "1"
                },
                "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": "prgname=MenuCall_Teacher&arguments=-N%2C-N%2C-N5%2C",
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
              }).then(response => response.text())
              .then(data => {
                document.open();
                document.write(data);
                document.close();
              });
              return false;  
            }
          </script>`)
        document.close();

      });
  }

  function requestUpLoadStudyMaterials(listMessages) {

    fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Linux\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "APPNAME=&PRGNAME=Teacher_Update_Homer&ARGUMENTS=TZ%2CUNIQ%2CYear%2CSemester%2CGroup%2CSub_Group%2CSubject%2CSubject_Type%2C-N0%2CR1C1%2CTeacher_ID&TZ=" + listMessages.listMessages[0].tz + "&UNIQ=" + listMessages.listMessages[0].uniq + "&Year=" + listMessages.listMessages[0].year + "&Semester=" + listMessages.listMessages[0].semester + "&Group=" + listMessages.listMessages[0].group + "&Sub_Group=" + listMessages.listMessages[0].subGroup + "&Subject=" + listMessages.listMessages[0].subject + "&Subject_Type=" + listMessages.listMessages[0].subjectType + "&Teacher_ID=+" + listMessages.listMessages[0].tz + "&Population_Type=%D7%9E&Lang=H&myTable1_length=10&R1C1=0&general_cmd38=0&general_cmd_datetime38=&general_cmd_studyunits38=-1&general_cmd_publish38=-1&general_cmd43=0&general_cmd_datetime43=&general_cmd_studyunits43=-1&general_cmd_publish43=-1&general_cmd1=0&general_cmd_datetime1=&general_cmd_studyunits1=-1&general_cmd_publish1=-1&myTable5_length=10&myTable6_length=10&myTable56_length=10&PercentageOfFailuresPerStudentForReport=0",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(response => response.text())
      .then(data => {
        debugger
        data = data.replaceAll(`onClick=\"SubmitForm(this, '','Teacher_Homer_In','TZ,UNIQ,Year,Semester,Group,Sub_Group,Subject,Subject_Type,Massege_code,R1C12,R1C2,R1C3,R1C4,R1C5,R1C6,R1C7,R1C8,,,,Teacher_ID,R1C10,R1C11,R1C13,R1C14,R1C15,R1C19,R1C16,R1C17,R1C18,R1C20','')\">`, "onclick =\"upLoadStudyMaterialsFunction();\">\t\t\r\n\t\t\t\t\t\t\t\r\n\t\t")
        document.open();
        document.write(data);
        document.write(`<script>
         
          var dataFile;

          $('.jqfileupload').each(function(e){	

            var w = $(this).closest('div').width();
            if (w == 0) {
              $(this).closest('div').css('background-position','center center');
            } else {
              w = w-318-95; /* 318 for image width, 95 for button width */
              if (w<0) {
                $(this).closest('div').css('background-image','inherit');
              } else {
                var val = parseInt(w/2)+'px center';
                $(this).closest('div').css('background-position',val);
              }
            }
            
            var jqid = '#'+$(this).parent().parent().parent().attr('id');
            var jqid_num = jqid.replace('#jqupload','');		
            var dropZoneElement;
            var dropZoneElement = $(".dropZoneElement"+jqid_num);
            
            $(this).fileupload({			
              autoUpload: true,
              formData: {
                arg: jqid_num
              },
              filesContainer : $(this).find("tbody.files"),
                    dropZone : dropZoneElement,
              maxChunkSize: 20000000, // 20 MB
              sequentialUploads: true,
              maxNumberOfFiles: 1,
              limitConcurrentUploads: 1,		
              url: 'https://yedion.jce.ac.il/yedion/fileupload.aspx',
              dataType: 'json',
              add: function(e, data) {
                alert("gggggggggggggggggg2222jjjjjjjjjjjjjjjj")
                dataFile = data;
                alert(dataFile)
                  $('#allowsubmit').val('N');
                  var uploadErrors = [];
                  var FilePrefAllowed = $('#FilePrefAllowed').val();
                  if (FilePrefAllowed!=null)
                  {
                    FilePrefAllowed = FilePrefAllowed.toLowerCase();
                    var fileExtension = data.originalFiles[0].name.substr((data.originalFiles[0].name.lastIndexOf('.') + 1)).toLowerCase();
                    var FilePrefAllowedItems = FilePrefAllowed.split(/\s*,\s*/);
                    var isAllowedFile = FilePrefAllowedItems.indexOf(fileExtension) > -1;
                    if (!isAllowedFile)
                    {
                      FilePrefAllowedA=replaceAll(FilePrefAllowed,",","/");
                      uploadErrors.push("<li>"+FilePrefAllowedItemsMessage+" "+FilePrefAllowedA+" "+FilePrefAllowedItemsMessageMore+"</li>");
                    }
                  }
                  var FileSizeMax = $('#FileSizeMax').val();
                  if (FileSizeMax!=null)
                  {
                    var fileSize = data.originalFiles[0]['size'];
                    fileSize = parseInt(fileSize/1024);
                    if(fileSize >= parseInt(FileSizeMax)) {
                      uploadErrors.push("<li>"+FileSizeMaxMessage+' '+parseInt(FileSizeMax/1000)+' MB')+"</li>";
                    }
                  }
                  if(uploadErrors.length > 0) {
                    $('.alertModal #title').html(uploadErrorsMessage);
                    $('.alertModal #desc').html("<ul>"+uploadErrors.join("<br>")+"</ul>");
                    $('.alertModal').modal('show');
                  } else {
                    data.submit();
                    alert(data);
                  }
              },
              done: function (e, data) {
                $('#allowsubmit').val('Y');
                $(jqid+' .progress').hide();
                $.each(data.result.files, function (index, file) {
                  var url = '<div style="float:right;"><a target="_blank" style="margin-top:0 !important;" class="btn btn-md u-btn-primary btn-primary rounded g-mb-12" href="'+file.url+'">'+view_txt+': '+file.name+'</a></div>';
                  var db = '<div style="float:left;"><input type="button" class="btn btn-md u-btn-primary btn-primary rounded g-mb-12 btn-danger delete_file" value="'+delete_txt+'" data-deleteurl="'+file.delete_url+'" /></div>';
                  $(jqid+' .files').html('<div>'+db+url+'</div>');
                });
                $(jqid+' .delete_file').click(function(e){
                  var delete_url = $(this).data('deleteurl');
                  $.ajax({
                    type: "POST",
                    async: false,
                    url: delete_url,
                    data: "",
                    contentType: "application/json; charset=utf-8",
                    error: function (XMLHttpRequest, textStatus, errorThrown) { },
                    success: function (result) {
                      $(jqid+' .fileUploadPH').show();
                      $(jqid+' .files').html('');
                    }
                    });
                });
              },
              progressall: function (e, data) {
                $(jqid+' .fileUploadPH').hide();
                $(jqid+' .progress').show();
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $(jqid+' #progress'+jqid_num+' .progress-bar').css(
                  'width',
                  progress + '%'
                );
                
                $(jqid+' #progress'+jqid_num+' .progressVal').html(progress+'%');
              }
            }).prop('disabled', !$.support.fileInput)
              .parent().addClass($.support.fileInput ? undefined : 'disabled').on('fileuploaddrop',function(e,data){
                if (data.files.length>1) {
                  alert('לא ניתן לטעון יותר מקובץ אחד');
                  e.preventDefault();
                }
              });
          }); 

            class Message{

              tz
              uniq
              ////remove
              year = 2020 
              semester
              group
              subGroup = 0000
              subject
              subjectType = 1

              constructor(tz,uniq,semester,group,subject)
              {
                  this.tz  = tz;
                  this.uniq = uniq;
                  // this.year = year;
                  this.semester = semester;
                  this.group = group;
                  this.subject = subject;
              }

            }

            async function upLoadStudyMaterialsFunction(){

              alert(dataFile)
              listMessages = ${listMessages.toCodeArray()}
              alert("lmjkijuhyv");

                console.log("upLoadStudyMaterialsEvent ");
                title = encodeURI($("#R1C3").val());
                description = encodeURI($("#R1C4").val());
                time = encodeURI($("#R1C8").val());
                date = encodeURI($("#R1C5").val());
                r1C12 = encodeURI($("#R1C12").val());
                r1C10 = encodeURI($("#R1C10").val());
                r1C10 = encodeURI($("#R1C10").val());
                r1C6 = encodeURI($("#R1C6").val());
                r1C7 = encodeURI($("#R1C7").val());
                r1C11 = encodeURI($("#R1C11").val());
                r1C13 = encodeURI($("#R1C13").val());
                r1C14 = encodeURI($("#R1C14").val());
                r1C19 = encodeURI($("#R1C19").val());
                r1C16 = encodeURI($("#R1C16").val());
                r1C17 = encodeURI($("#R1C17").val());
                r1C18 = encodeURI($("#R1C18").val());

               for(var i = 0; i<listMessages.length; i++){
                if(i!=0 && i<=listMessages.length){
                  alert(i)
                  await dataFile.submit();
                  alert(dataFile);
                }
                await fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
                    "headers": {
                      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7",
                      "cache-control": "max-age=0",
                      "content-type": "application/x-www-form-urlencoded",
                      "sec-ch-ua-mobile": "?0",
                      "sec-fetch-dest": "document",
                      "sec-fetch-mode": "navigate",
                      "sec-fetch-site": "same-origin",
                      "sec-fetch-user": "?1",
                      "upgrade-insecure-requests": "1"
                    },
                    "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": "APPNAME=&PRGNAME=Teacher_Homer_In&ARGUMENTS=TZ%2CUNIQ%2CYear%2CSemester%2CGroup%2CSub_Group%2CSubject%2CSubject_Type%2CMassege_code%2CR1C12%2CR1C2%2CR1C3%2CR1C4%2CR1C5%2CR1C6%2CR1C7%2CR1C8%2C%2C%2C%2CTeacher_ID%2CR1C10%2CR1C11%2CR1C13%2CR1C14%2CR1C15%2CR1C19%2CR1C16%2CR1C17%2CR1C18%2CR1C20&TZ=+"+listMessages[i].tz+"&UNIQ="+listMessages[i].uniq+"&Year="+listMessages[i].year+"&Semester="+listMessages[i].semester+"&Group="+listMessages[i].group+"&Sub_Group=+++"+listMessages[i].subGroup+"&Subject=++"+listMessages[i].subject+"&Subject_Type=+++"+listMessages[i].subjectType+"&Massege_code=++++++++0&Teacher_ID=+"+listMessages[i].tz+"&R1C12=++"+r1C12+"&R1C3="+title+"&R1C4="+description+"&arg=1&files1=&R1C5="+date+"&R1C8="+time+"&R1C10="+r1C10+"&R1C6=&R1C7=&R1C11="+r1C11+"&R1C13="+r1C13+"&Embed=&R1C14="+r1C14+"&R1C19="+r1C19+"&R1C16="+r1C16+"&R1C17=&R1C18=&arg=2&files2=&arg=4&files4=&arg=5&files5=&arg=3&files3=&ActionAtSemesterEnd=D&DateRequeredToView=&DaysBeforeToRemind=&NumberOfDaysBetweenDeliveryReminders=",
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                  });
                  // .then(response => {
                    // if(i!=0 && i<=listMessages.length){
                    //   alert(i)
                    //   dataFile.submit().then(()=>{
                    //     alert(dataFile);
                    //   });

                       //.then(data => {

                        // alert(i)

                        //   fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
                        //     "headers": {
                        //       "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        //       "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7",
                        //       "cache-control": "max-age=0",
                        //       "content-type": "application/x-www-form-urlencoded",
                        //       "sec-ch-ua-mobile": "?0",
                        //       "sec-fetch-dest": "document",
                        //       "sec-fetch-mode": "navigate",
                        //       "sec-fetch-site": "same-origin",
                        //       "sec-fetch-user": "?1",
                        //       "upgrade-insecure-requests": "1"
                        //     },
                        //     "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
                        //     "referrerPolicy": "strict-origin-when-cross-origin",
                        //     "body": "prgname=MenuCall_Teacher&arguments=-N%2C-N%2C-N5%2C",
                        //     "method": "POST",
                        //     "mode": "cors",
                        //     "credentials": "include"
                        //   }).then(response => response.text())
                        //   .then(data => {
                        //     document.open();
                        //     document.write(data);
                        //     document.close();
                        //   });
                        // });      
                    // }
                //  });
              }
              
              fetch("https://yedion.jce.ac.il/yedion/fireflyweb.aspx", {
                "headers": {
                  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7",
                  "cache-control": "max-age=0",
                  "content-type": "application/x-www-form-urlencoded",
                  "sec-ch-ua-mobile": "?0",
                  "sec-fetch-dest": "document",
                  "sec-fetch-mode": "navigate",
                  "sec-fetch-site": "same-origin",
                  "sec-fetch-user": "?1",
                  "upgrade-insecure-requests": "1"
                },
                "referrer": "https://yedion.jce.ac.il/yedion/fireflyweb.aspx",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": "prgname=MenuCall_Teacher&arguments=-N%2C-N%2C-N5%2C",
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
              }).then(response => response.text())
              .then(data => {
                document.open();
                document.write(data);
                document.close();
              });

              return false;      

            }
          </script>`)
        document.close();
      });
  }
  fnAddButtons();
})();


