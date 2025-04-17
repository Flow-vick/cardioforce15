document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const weekNumber = urlParams.get('week');
    const weekTitle = document.getElementById('week-title');
    const exerciseList = document.getElementById('exercise-list');

    // Vérifier si le paramètre week est présent
    if (!weekNumber) {
        alert("Veuillez sélectionner une semaine depuis la page d'accueil.");
        window.location.href = 'start.html';
        return;
    }

    weekTitle.textContent = `Semaine ${weekNumber}`;

    // Données directement intégrées (contenu de exercices.csv)
    const csvData = `
Semaines;Jour;Nom de séance;Détail de la séance;Rép/Durée;;
Semaine 1;Lundi;Vénus;50 pompes, 20 jacknives, 50 deep squats;X 4;;
;Mardi;;Burpee maximum;5min;;
;Mercredi;Aphrodite;50 burpee, 50 squats, 50 situps, 40, 30, 20, 10..;;;
;Jeudi;;Squat maximum;5min;;
;Vendredi;Dione;75 jumping jack, 25 burpee, 50 leg levers, 75 jumping jack, 50 sit-ups, 25 burpee;X 3;;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 2;Lundi;Artemis;100 pompes, 150 squat, 50 burpee;;;
;Mardi;Metis;10 burpee, 10 climber, 10 high-jump / 25 burpee, 25 climber, 25 high-jump / 10 burpee, 10 climber, 10 high-jump;X 3;;
;Mercredi;Aphrodite;50 burpee, 50 squats, 50 situps, 40, 30, 20, 10..;;;
;Jeudi;;Burpee maximum;5min;;
;Vendredi;Artemis;100 pompes, 150 squat, 50 burpee;;;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 3;Lundi;Aphrodite;50 burpee, 50 squats, 50 situps, 40, 30, 20, 10..;;;
;Mardi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x 40 ) ;;;
;Mercredi;Repos;;;;
;Jeudi;Artemis;100 pompes, 150 squat, 50 burpee;;;
;Vendredi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x 40 );7 minutes de pause / Situps maximum ( 5 minutes );;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 4;Lundi;Aphrodite;50 burpee, 50 squats, 50 situps, 40, 30, 20, 10..;;;
;Mardi;Aphrodite;50 burpee, 50 squats, 50 situps, 40, 30, 20, 10..;;;
;Mercredi;Repos;;;;
;Jeudi;;Pompes maximum, tractions maximum;5 minutes par série, 3 de chaque avec 3 minutes de pause entre chaque série;;
;Vendredi;Aphrodite;50 burpee, 50 squats, 50 situps, 40, 30, 20, 10..;;;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 5;Lundi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x 40 );X 3;;
;Mardi;Artemis;100 pompes, 150 squat, 50 burpee;;;
;Mercredi;;Situps maximum, burpee maximum, situps maximum;3 minutes de pause après situps, 4 minutes de pause après Burpee;;
;Jeudi;Iris;run 1 km / ( 100 jumping jack, 100 climber ) / run 1 km;(…) X 5;;
;Vendredi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x 40 );X 3;;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 6;Lundi;Zeus;( HS pompes, 15 tractions, 25 pompes, 35 situps, 45 squats );X 4, 2 minutes de pause entre chaque série;;
;Mardi;;Burpee maximum;5min;;
;Mercredi;Artemis;100 pompes, 150 squat, 50 burpee;;;
;Jeudi;Aphrodite;50 burpee, 50 squats, 50 situps, 40, 30, 20, 10..;;;
;Vendredi;Zeus;( HS pompes, 15 tractions, 25 pompes, 35 situps, 45 squats );X 4, 2 minutes de pause entre chaque série;;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 7;Hell lundi;Dione / Poséidon / Vénus;75 jumping jack, 25 burpee, 50 leg levers, 75 jumping jack, 50 sit-ups, 25 burpee / 20 tractions, 20 pompes / 15 tractions, 15 pompes / 10 tractions, 10 pompes / 5 tractions, 5 pompes / 50 pompes, 20 jackknives, 50 deep squats;X 3 / / ;;
;Mardi;repos;;;;
;Hell mercredi;Artemis / Metis / Aphrodite;50 burpee, 50 traction, 100 pompes, 150 squat, 50 burpee / 10 burpee, 10 climber, 10 high jump / 25 burpee, 25 climber, 25 high jump / 10 burpee, 10 climber, 10 high jump / 50 burpee, 50 squats, 50 situps / 40 burpee, 40 squats, 40 situps / 30 burpee, 30 squats, 30 situps / 20 burpee, 20 squats, 20 situps / 10 burpee, 10 squats, 10 situps; / / ;;
;Jeudi;repos;;;;
;Hell vendredi;Poséidon / Zeus / Iris;20 tractions, 20 pompes / 15 tractions, 15 pompes / 10 tractions, 10 pompes / 5 tractions, 5 pompes / 5 HS pompes, 15 traction, 25 pompes, 35 situps, 45 squat / run 1 km / ( 100 jumping jack, 100 climbers ) / run 1 km; / X 4 avec 2 min de pause entre chaque série / X 5;;
;Samedi;repos;;;;
;Dimanche;repos;;;;
;;;;;;
Semaine 8;Lundi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x 40 );X 3;;
;Mardi;;Squat maximum, situps maximum;5 minutes par série, 5 minutes de pause entre séries;;
;Mercredi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x 40 );X 3;;
;Jeudi;Zeus;( HS pompes, 15 tractions, 25 pompes, 35 situps, 45 squats );X 4, 2 minutes de pause entre chaque série;;
;Vendredi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x 40 );X 3;;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 9;Lundi;Zeus;( HS pompes, 15 tractions, 25 pompes, 35 situps, 45 squats );X 4, 2 minutes de pause entre chaque série;;
;Mardi;Iris;run 1 km / ( 100 jumping jack, 100 climber ) / run 1 km;(…) X 5;;
;Mercredi;Repos;;;;
;Jeudi;Artemis;100 pompes, 150 squat, 50 burpee;;;
;Vendredi;Iris;run 1 km / ( 100 jumping jack, 100 climber ) / run 1 km;(…) X 5;;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 10;Lundi;Zeus;( HS pompes, 15 tractions, 25 pompes, 35 situps, 45 squats );X 4, 2 minutes de pause entre chaque série;;
;Mardi;Iris;run 1 km / ( 100 jumping jack, 100 climber ) / run 1 km;(…) X 5;;
;Mercredi;Repos;;;;
;Jeudi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x 40 );X 3;;
;Vendredi;Aphrodite;50 burpee, 50 squats, 50 situps, 40, 30, 20, 10..;;;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 11;Lundi;Artemis;100 pompes, 150 squat, 50 burpee;;;
;Mardi;;pompes maximum / burpee maximum;3 séries de pompes ( 5 minutes d’effort, 3 minutes de pause entre chaque série ) / 5 minutes;;
;Mercredi;Dione;75 jumping jack, 25 burpee, 50 leg levers, 75 jumping jack, 50 sit-ups, 25 burpee;X 3;;
;Jeudi;;tractions maximum / burpee maximum;3 séries de tractions ( 5 minutes d’effort, 4 minutes de pause entre chaque série ) / 5 minutes d’effort;;
;Vendredi;Vénus;50 pompes, 20 jackknives, 50 deepsquats;;;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 12;Lundi;Aphrodite;50 burpee, 50 squats, 50 situps, 40, 30, 20, 10..;;;
;Mardi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x
