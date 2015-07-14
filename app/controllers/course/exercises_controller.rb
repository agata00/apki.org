module Course
  class ExercisesController < CourseAdminController
    before_action :check_lesson_id, only: [:index, :create]
    before_action :set_course_exercise, only: [:show, :update, :destroy]

    # GET /course/exercises.json
    def index
      @course_exercises = Course::Lesson.find(params[:lesson_id]).course_exercises
    end

    # GET /course/exercises/1.json
    def show
    end

    # POST /course/exercises.json
    def create
      lesson = Course::Lesson.find(params[:lesson_id])
      @course_exercise = Course::Exercise.new
      lesson.course_exercises << @course_exercise

      respond_to do |format|
        if @course_exercise.save
          format.json { render :show, status: :created, location: @course_exercise }
        else
          format.json { render json: @course_exercise.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /course/exercises/1.json
    def update
      @course_exercise[:data] = @course_exercise.data.merge(JSON.parse(request.body.read))
      respond_to do |format|
        if @course_exercise.save
          format.json { render :show, status: :ok, location: @course_exercise }
        else
          format.json { render json: @course_exercise.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /course/exercises/1.json
    def destroy
      @course_exercise.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end

    private
    def set_course_exercise
      @course_exercise = Course::Exercise.find(params[:id])
    end

    def check_lesson_id
      if !params.has_key?(:lesson_id) or (params.has_key?(:lesson_id) and !Course::Lesson.where(id: params[:lesson_id]).exists?)
        raise Exceptions::NotFound
      end
    end
  end
end