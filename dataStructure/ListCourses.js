

class ListCourses{

    listCourses;

    constructor()
    {
        this.listCourses  =  new Array();

    }

    addCourseTolist(Course) {
        return this.listCourses.push(Course);
    }
}