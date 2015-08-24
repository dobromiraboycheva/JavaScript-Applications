/* 
Create a function that:
*   Takes an array of students
    *   Each student has:
        *   `firstName`, `lastName` and `age` properties
        *   Array of decimal numbers representing the marks         
*   **finds** the student with highest average mark (there will be only one)
*   **prints** to the console  'FOUND_STUDENT_FULLNAME has an average score of MARK_OF_THE_STUDENT'
    *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
*   **Use underscore.js for all operations**
*/

function solve() {
    return function (students) {
        var studentList = _.chain(students).map(function (student) {
            student.fullname = student.firstName + ' ' + student.lastName;
            var sum = 0;
            for (var i = 0, len = student.marks.length; i < len; i++) {
                sum += student.marks[i];
            }

            student.averageMark = sum / len;
            return student;
        }).sortBy('averageMark').last().value();

        console.log(studentList.fullname + ' has an average score of ' + studentList.averageMark);
    };
}

module.exports = solve;
