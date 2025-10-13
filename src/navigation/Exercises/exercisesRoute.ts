import ExerciseDetails from "../../modules/exercises/ExerciseDetails/ExerciseDetails";
import ExerciseHome from "../../modules/exercises/ExerciseHome/ExerciseHome";
import ExerciseWorkout from "../../modules/exercises/ExerciseWorkout/ExerciseWorkout";
import { Route } from "../routes";

export const exercisesRoutes: Route[] = [
  {name: 'ExercisesHome', component: ExerciseHome},
  {name: 'ExerciseDetails', component: ExerciseDetails},
  {name: 'ExerciseWorkout', component: ExerciseWorkout},
  {name: 'EvaluateExercise', component: (/* EvaluateExercise */) => null},
];