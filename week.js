document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const weekNumber = urlParams.get('week');
    const weekTitle = document.getElementById('week-title');
    const exerciseList = document.getElementById('exercise-list');

    // Vérifier si le paramètre week est présent
    if (!weekNumber) {
        console.log("Aucun numéro de semaine trouvé dans l'URL.");
        alert("Veuillez sélectionner une semaine depuis la page d'accueil.");
        window.location.href = 'start.html';
        return;
    }

    weekTitle.textContent = `Semaine ${weekNumber}`;
    console.log(`Semaine cible : Semaine ${weekNumber}`);

    // Liste fixe des jours (lundi à dimanche)
    const daysOfWeek = [
        { name: "Lundi", displayName: "Lundi" },
        { name: "Mardi", displayName: "Mardi" },
        { name: "Mercredi", displayName: "Mercredi" },
        { name: "Jeudi", displayName: "Jeudi" },
        { name: "Vendredi", displayName: "Vendredi" },
        { name: "Samedi", displayName: "Samedi" },
        { name: "Dimanche", displayName: "Dimanche" }
    ];

    // Normalisation des noms des jours
    const normalizeDayName = (dayName) => {
        const normalized = dayName.toLowerCase();
        if (normalized.includes('lundi')) return 'Lundi';
        if (normalized.includes('mardi')) return 'Mardi';
        if (normalized.includes('mercredi')) return 'Mercredi';
        if (normalized.includes('jeudi')) return 'Jeudi';
        if (normalized.includes('vendredi')) return 'Vendredi';
        if (normalized.includes('samedi')) return 'Samedi';
        if (normalized.includes('dimanche')) return 'Dimanche';
        return null; // Ignorer les jours non reconnus
    };

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
;Vendredi;Aphrodite;50 burpee, 54 squats, 50 situps, 40, 30, 20, 10..;;;
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
;Mardi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x 40 );7 minutes de pause / Situps maximum ( 5 minutes );;
;Mercredi;Repos;;;;
;Jeudi;;Burpee maximum;X 3 ( 3 minutes de pause entre chaque série );;
;Vendredi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80 m ( 2 x 40 );7 minutes de pause / Situps maximum ( 5 minutes );;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 13;Lundi;Dione;75 jumping jack, 25 burpee, 50 leg levers, 75 jumping jack, 50 sit-ups, 25 burpee;X 3;;
;Mardi;;Pompes maximum, tractions maximum;5 minutes par série, 3 minutes de pauses entre chaque série;;
;Mercredi;Vénus;50 pompes, 20 jackknives, 50 deepsquats;;;
;Jeudi;;Burpee maximum;5min;;
;Vendredi;Dione;75 jumping jack, 25 burpee, 50 leg levers, 75 jumping jack, 50 sit-ups, 25 burpee;X 3;;
;Samedi;Repos;;;;
;Dimanche;Repos;;;;
;;;;;;
Semaine 14;Lundi;Poséidon / 5 min de pause / Metis;20 tractions, 20 pompes / 15 tractions, 15 pompes / 10 tractions, 10 pompes / 5 tractions, 5 pompes / 10 burpee, 10 climber, 10 high jump / 25 burpee, 25 climber, 25 high jump / 10 burpee, 10 climber, 10 high jump;;;
;Mardi;Iris;run 1 km / ( 100 jumping jack, 100 climbers ) / run 1 km;X 5, 7 min de pause, situp max;;
;Mercredi;repos;;;;
;Jeudi;Poséidon / 5 min de pause / Metis;20 tractions, 20 pompes / 15 tractions, 15 pompes / 10 tractions, 10 pompes / 5 tractions, 5 pompes / 10 burpee, 10 climber, 10 high jump / 25 burpee, 25 climber, 25 high jump / 10 burpee, 10 climber, 10 high jump;;;
;Vendredi;Iris;run 1 km / ( 100 jumping jack, 100 climbers ) / run 1 km;X 5, 7 min de pause, situp max;;
;Samedi;repos;;;;
;Dimanche;repos;;;;
;;;;;;
Semaine 15;Hell lundi;Aphrodite;50 burpee, 50 squats, 50 situps / 40 burpee, 40 squats, 40 situps / 30 burpee, 30 squats, 30 situps / 20 burpee, 20 squats, 20 situps / 10 burpee, 10 squats, 10 situps;7 min de pause, situps max;;
;Hell mardi;Artemis;50 burpee, 50 traction, 100 pompes, 150 squat, 50 burpee;7 min de pause, situps max;;
;Hell mercredi;Poséidon / squat max / Dione;20 tractions, 20 pompes / 15 tractions, 15 pompes / 10 tractions, 10 pompes / 5 tractions, 5 pompes / 5 minutes / 75 jumping jack, 25 burpee, 50 leg levers, 75 jumping jack, 50 sit-ups, 25 burpee; / / X 3;;
;Hell jeudi;Hadès;25 burpee, 15 tractions, 15 pompes, 25 burpee, run 80m (2x40);7 min de pause, situp max;;
;Hell vendredi;Iris;run 1 km / ( 100 jumping jack, 100 climbers ) / run 1 km;X 5, 7 min de pause, tractions max;;
;Hell samedi;Vénus;50 pompes, 20 jackknives, 50 deep squats;7 min de pause, squat X 4 avec 2 min de pause;;
;Hell dimanche;Zeus / Metis / Artemis;5 HS pompes, 15 traction, 25 pompes, 35 situps, 45 squat / 10 burpee, 10 climber, 10 high jump / 25 burpee, 25 climber, 25 high jump / 10 burpee, 10 climber, 10 high jump / 50 burpee, 50 traction, 100 pompes, 150 squat, 50 burpee;X 4 avec 2 min de pause entre chaque série / / ;;
`;

    const rows = csvData.trim().split('\n');
    const exercisesByDay = {};
    let currentWeek = null;

    // Parse le CSV (séparateur : point-virgule)
    rows.forEach((row, rowIndex) => {
        const cols = row.split(';').map(col => col ? col.trim() : '');
        const week = cols[0];

        // Détecter si la ligne définit une nouvelle semaine
        if (week && week.startsWith('Semaine')) {
            currentWeek = week;
            console.log(`Semaine détectée à la ligne ${rowIndex + 1} : ${currentWeek}`);
        }

        // Récupérer les exercices pour la semaine sélectionnée
        if (currentWeek && currentWeek === `Semaine ${weekNumber}` && cols[1]) {
            const normalizedDay = normalizeDayName(cols[1]);
            if (normalizedDay && daysOfWeek.some(day => day.name === normalizedDay)) {
                console.log(`Exercice trouvé pour ${currentWeek} : Jour ${normalizedDay}`);
                exercisesByDay[normalizedDay] = {
                    week: currentWeek,
                    day: normalizedDay,
                    sessionName: cols[2] || '',
                    sessionDetails: cols[3] || '',
                    repsDuration: cols[4] || ''
                };
            } else {
                console.log(`Jour ignoré (non reconnu ou hors lundi-dimanche) : ${cols[1]}`);
            }
        }
    });

    // Vider complètement le contenu existant de exerciseList pour éviter les doublons
    while (exerciseList.firstChild) {
        exerciseList.removeChild(exerciseList.firstChild);
    }

    // Afficher les exercices pour chaque jour de lundi à dimanche
    if (Object.keys(exercisesByDay).length === 0) {
        console.log(`Aucun exercice trouvé pour la Semaine ${weekNumber}`);
        exerciseList.innerHTML = '<p>Aucun exercice trouvé pour cette semaine.</p>';
    } else {
        console.log(`Nombre de jours avec exercices : ${Object.keys(exercisesByDay).length}`);

        // Calculer la progression initiale
        const totalDays = daysOfWeek.length; // Toujours 7 jours (lundi à dimanche)
        let completedDays = 0;

        daysOfWeek.forEach((dayObj, index) => {
            const exercise = exercisesByDay[dayObj.name] || {
                day: dayObj.name,
                sessionName: 'Repos',
                sessionDetails: '',
                repsDuration: ''
            };
            const storageKey = `exercise_${weekNumber}_${exercise.day}_${index}`;
            try {
                if (localStorage && localStorage.getItem(storageKey) === 'true') {
                    completedDays++;
                }
            } catch (e) {
                console.warn("localStorage non disponible ou bloqué : progression non mise à jour", e);
            }
        });

        const progressPercentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

        // Ajouter la barre de progression
        let progressDiv = document.createElement('div');
        progressDiv.classList.add('progress');
        progressDiv.innerHTML = `<p>Semaine ${weekNumber} : ${completedDays}/${totalDays} jours terminés (${progressPercentage}%)</p>`;
        exerciseList.appendChild(progressDiv);
        console.log(`Progression calculée : ${completedDays}/${totalDays} (${progressPercentage}%)`);

        // Afficher les exercices pour chaque jour (lundi à dimanche)
        daysOfWeek.forEach((dayObj, index) => {
            const exercise = exercisesByDay[dayObj.name] || {
                day: dayObj.name,
                sessionName: 'Repos',
                sessionDetails: '',
                repsDuration: ''
            };

            const exerciseDiv = document.createElement('div');
            exerciseDiv.classList.add('exercise-item');

            const storageKey = `exercise_${weekNumber}_${exercise.day}_${index}`;
            let isCompleted = false;
            try {
                if (localStorage) {
                    isCompleted = localStorage.getItem(storageKey) === 'true';
                }
            } catch (e) {
                console.warn("localStorage non disponible ou bloqué : sauvegarde désactivée", e);
            }

            // Vérifier si l'exercice a une durée pour afficher un bouton timer
            let timerHtml = '';
            let durationInSeconds = 0;
            if (exercise.repsDuration && exercise.repsDuration.includes('min')) {
                const minutesMatch = exercise.repsDuration.match(/\d+/);
                if (minutesMatch) {
                    const minutes = parseInt(minutesMatch[0], 10);
                    durationInSeconds = minutes * 60;
                    timerHtml = `
                        <div class="timer-container" id="timer-container-${index}">
                            <button class="timer-btn" data-duration="${durationInSeconds}" data-index="${index}">Démarrer le timer (${minutes} min)</button>
                            <button class="stop-btn" id="stop-${index}" style="display: none;">Arrêter</button>
                            <button class="reset-btn" id="reset-${index}" style="display: none;">Réinitialiser</button>
                            <div class="timer-display" id="timer-${index}" style="display: none;"></div>
                        </div>
                    `;
                }
            }

            exerciseDiv.innerHTML = `
                <div class="exercise-header">
                    <h3>${dayObj.displayName}</h3>
                    <label class="checkbox-container">
                        Terminé
                        <input type="checkbox" class="exercise-checkbox" data-storage-key="${storageKey}" ${isCompleted ? 'checked' : ''}>
                        <span class="checkmark"></span>
                    </label>
                </div>
                ${exercise.sessionName ? `<p><strong>Séance :</strong> ${exercise.sessionName}</p>` : ''}
                <p><strong>Détails :</strong> ${exercise.sessionDetails}</p>
                ${exercise.repsDuration ? `<p><strong>Rép/Durée :</strong> ${exercise.repsDuration}</p>` : ''}
                ${timerHtml}
            `;
            exerciseList.appendChild(exerciseDiv);
        });

        // Ajouter le bouton "Retour" une seule fois
        // Vérifier si un bouton avec l'ID spécifique existe déjà
        let backButton = document.getElementById('back-button');
        if (!backButton) {
            backButton = document.createElement('button');
            backButton.id = 'back-button'; // Ajouter un ID unique pour éviter les doublons
            backButton.classList.add('back-button');
            backButton.textContent = 'Retour';
            backButton.addEventListener('click', () => {
                window.location.href = 'start.html';
            });
            exerciseList.appendChild(backButton);
        }

        // Gérer les checkboxes et mettre à jour la progression
        const checkboxes = document.querySelectorAll('.exercise-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const storageKey = e.target.getAttribute('data-storage-key');
                try {
                    if (localStorage) {
                        localStorage.setItem(storageKey, e.target.checked);
                    }
                } catch (e) {
                    console.warn("localStorage non disponible ou bloqué : sauvegarde désactivée", e);
                }

                // Mettre à jour la progression après un changement
                let updatedCompletedDays = 0;
                daysOfWeek.forEach((dayObj, index) => {
                    const key = `exercise_${weekNumber}_${dayObj.name}_${index}`;
                    if (localStorage.getItem(key) === 'true') {
                        updatedCompletedDays++;
                    }
                });
                const updatedProgressPercentage = totalDays > 0 ? Math.round((updatedCompletedDays / totalDays) * 100) : 0;
                progressDiv.innerHTML = `<p>Semaine ${weekNumber} : ${updatedCompletedDays}/${totalDays} jours terminés (${updatedProgressPercentage}%)</p>`;
                console.log(`Progression mise à jour : ${updatedCompletedDays}/${totalDays} (${updatedProgressPercentage}%)`);
            });
        });

        // Gérer le mode sombre/clair
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        const isDark = localStorage.getItem('theme') !== 'light'; // Par défaut, thème sombre
        if (!isDark) {
            body.classList.add('light-theme');
            themeToggle.textContent = 'Mode sombre';
        } else {
            themeToggle.textContent = 'Mode clair';
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggle.textContent = isLight ? 'Mode sombre' : 'Mode clair';
        });

        // Gérer les timers
        const timerButtons = document.querySelectorAll('.timer-btn');
        timerButtons.forEach(button => {
            let timerInterval = null;

            const startTimer = (e) => {
                e.preventDefault();
                console.log("Timer button clicked or touched!");
                const duration = parseInt(button.getAttribute('data-duration'), 10);
                const index = button.getAttribute('data-index');
                let timeLeft = duration;
                const timerDisplay = document.getElementById(`timer-${index}`);
                const stopButton = document.getElementById(`stop-${index}`);
                const resetButton = document.getElementById(`reset-${index}`);
                timerDisplay.style.display = 'inline-block';
                stopButton.style.display = 'inline-block';
                resetButton.style.display = 'inline-block';
                button.disabled = true;

                const endSound = new Audio('thunder.mp3');
                endSound.load();

                timerInterval = setInterval(() => {
                    const minutes = Math.floor(timeLeft / 60);
                    const seconds = timeLeft % 60;
                    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        timerDisplay.textContent = 'Terminé !';
                        button.disabled = false;
                        stopButton.style.display = 'none';
                        resetButton.style.display = 'inline-block';
                        endSound.play().catch(error => {
                            console.warn("Erreur lors de la lecture du son :", error);
                        });
                    }
                    timeLeft--;
                }, 1000);

                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                // Gérer le bouton "Arrêter"
                stopButton.addEventListener('click', () => {
                    clearInterval(timerInterval);
                    timerDisplay.textContent = 'Arrêté';
                    button.disabled = false;
                    stopButton.style.display = 'none';
                    resetButton.style.display = 'inline-block';
                });

                // Gérer le bouton "Réinitialiser"
                resetButton.addEventListener('click', () => {
                    clearInterval(timerInterval);
                    timerDisplay.textContent = '';
                    timerDisplay.style.display = 'none';
                    button.disabled = false;
                    stopButton.style.display = 'none';
                    resetButton.style.display = 'none';
                });
            };

            button.addEventListener('click', startTimer);
            button.addEventListener('touchstart', startTimer);
        });
    }
});
