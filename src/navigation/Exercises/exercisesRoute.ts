import ExerciseDetails from '../../modules/exercises/ExerciseDetails/ExerciseDetails';
import ExerciseHome from '../../modules/exercises/ExerciseHome/ExerciseHome';
import ExerciseWorkout from '../../modules/exercises/ExerciseWorkout/ExerciseWorkout';
import {Route} from '../routes';

const EvaluateExercisePlaceholder: React.FC = () => null;

export const exercisesRoutes: Route[] = [
  {name: 'ExercisesHome', component: ExerciseHome},
  {name: 'ExerciseDetails', component: ExerciseDetails},
  {name: 'ExerciseWorkout', component: ExerciseWorkout},
  {name: 'EvaluateExercise', component: EvaluateExercisePlaceholder},
];
