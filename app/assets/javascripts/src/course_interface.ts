//(c) Jakub Krol 2015

module ApkiOrg.CourseMgr {
    export interface IAchievement{
        ID                  :number;            //Unique ID of achievement

        title               :string;            //Title of achievement
        icon_src            :string;            //Src to use with image to represent achievement
        points              :number;            //Number of points to add (DONT USE IT AT SERVER SIDE, use ID of achievement instead)
    }

    export interface IQuiz{
        ID                  :number;            //Unique ID of quiz

        question            :string;            //Content of question (HTML)
        answers             :string[];          //Array of possible anserws.

        achievement         :IAchievement;      //Achievement for finished quiz (null if none)
    }

    export interface ICodeLockCoord{
        rowStart            :number;            //Beginning of code lock - starting row
        colStart            :number;            //Beginning of code lock - starting column
        rowEnd              :number;            //End of code lock - ending row
        colEnd              :number;            //End of code lock - ending column
    }

    export interface IExercise{
        ID                  :number;            //Unique ID of exercise

        content_of_exercise :string;            //Content of exercise (command what to do) (HTML)
        code                :string;            //Initial visible code
        code_locks          :ICodeLockCoord[];  //Code locks
        allow_user_input    :boolean;           //True if user input should be visible
        lang                :string;            //Programming language ACE code

        achievement         :IAchievement;      //Achievement for finished exercise (null if none)
    }

    export interface ILesson{
        ID                  :number;            //Unique ID of lesson

        title               :string;            //Title of lesson

        article             :string;            //Conent of article in lesson (HTML)
        quizzes             :IQuiz[];           //Quizes of lesson (empty if none)
        exercises           :IExercise[];       //Exercises of lesson (empty if none)

        achievement         :IAchievement;      //Achievement for finished lesson (null if none)
    }

    export interface ICourse{
        //Constant Metadata
        ID                  :number;            //Unique ID of course
        title               :string;            //Title of the Course
        description         :string;            //Description of the Course
        icon_src            :string;            //Src to use with images to represent current course

        //User-variable-metadata
        lessonsPassed       :number[];          //List of IDs of passed lessons
        lessonCurrent       :number;            //ID of current lesson, 0 or first lesson ID == from the beginning
        finished            :boolean;           //True if course is finished

        //Lessions:
        lessons            :ILesson[];         //Lessions in course
    }

    //Communication interfaces:
    export interface ICommSendExercise{
        ID                  :number;            //Unique ID
        code                :string;            //Whole code
        user_input          :string;            //Whole user input (empty if not allowed)
    }

    export interface ICommRecvExercise{
        ID                  :number;            //Unique ID
        output              :string;            //Output of code / errors / console, whatever...
        is_correct          :boolean;           //True if output is correct, as expected
    }

    export interface ICommSendQuiz{
        ID                  :number;            //Unique ID
        answer_idx          :string;            //Answer idx
    }

    export interface ICommRecvQuiz{
        ID                  :number;            //Unique ID
        is_correct          :boolean;           //True if answer is correct
    }

    export interface ICommSendAchievement{
        ID                  :number;            //Unique ID
    }
}