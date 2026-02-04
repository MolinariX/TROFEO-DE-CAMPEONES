const FALLBACK_IMG = "https://placehold.co/100x100/111/e50914?text=FC";
        const FALLBACK_USER = "https://placehold.co/50x50/333/ccc?text=User";

        // ================= CONFIGURACIÓN =================
        const tournamentChampionId = null;
        const currentFixtureRound = 2;

        // ================= DATOS EQUIPOS CON ABREVIATURAS =================
        const teamsData = [
            { id: 'murphy', name: 'Murphy F.C', shortName: 'Murphy', logo: 'imagen/equipos/murphy.png', apertura: { j: 11, g: 7, e: 2, p: 2, gf: 22, gc: 12, pts: 23 }, isAperturaChamp: true },
            { id: 'juv_venadense', name: 'Juv. Venadense', shortName: 'Juv. Ven.', logo: 'imagen/equipos/juv_venadense.png', apertura: { j: 11, g: 7, e: 1, p: 3, gf: 26, gc: 16, pts: 22 } },
            { id: 'la_banda', name: 'La Banda FC', shortName: 'La Banda', logo: 'imagen/equipos/la_banda.png', apertura: { j: 11, g: 7, e: 1, p: 3, gf: 33, gc: 19, pts: 22 } },
            { id: 'construshop', name: 'Construshop', shortName: 'Construs.', logo: 'imagen/equipos/construshop.png', apertura: { j: 11, g: 7, e: 2, p: 2, gf: 29, gc: 13, pts: 21 } },
            { id: 'nicassio', name: 'Nicassio', shortName: 'Nicassio', logo: 'imagen/equipos/nicassio.png', apertura: { j: 11, g: 6, e: 2, p: 3, gf: 29, gc: 18, pts: 20 } },
            { id: 'los_resa', name: 'Los Resa', shortName: 'Los Resa', logo: 'imagen/equipos/los_resa.png', apertura: { j: 11, g: 6, e: 2, p: 3, gf: 22, gc: 19, pts: 20 } },
            { id: 'schmol', name: 'Schmol Alineaciones', shortName: 'Schmol A.', logo: 'imagen/equipos/schmol.png', apertura: { j: 11, g: 6, e: 1, p: 4, gf: 26, gc: 19, pts: 19 } },
            { id: 'pacifico', name: 'Pacífico F.C', shortName: 'Pacífico', logo: 'imagen/equipos/pacifico.png', apertura: { j: 11, g: 4, e: 3, p: 4, gf: 27, gc: 22, pts: 15 } },
            { id: 'sp_penarol', name: 'Sportivo Peñarol', shortName: 'S. Peñarol', logo: 'imagen/equipos/sp_penarol.png', apertura: { j: 11, g: 2, e: 3, p: 6, gf: 15, gc: 31, pts: 9 } },
            { id: 'cup_athletic', name: 'Cup Athletic', shortName: 'Cup Ath.', logo: 'imagen/equipos/cup_athletic.png', apertura: { j: 11, g: 0, e: 4, p: 7, gf: 9, gc: 22, pts: 4 } },
            { id: 'sport_blak', name: 'Sport Blak', shortName: 'Sport Blak', logo: 'imagen/equipos/sport_blak.png', apertura: { j: 11, g: 0, e: 2, p: 9, gf: 7, gc: 43, pts: 2 } },
            { id: 'flamingo', name: 'Flamingo F.C', shortName: 'Flamingo', logo: 'imagen/equipos/flamingo.png', apertura: { j: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 } }
        ];

        // ================= CONFIGURACIÓN DE FINALES =================
        // Aquí puedes definir manualmente los campeones de A y B, y los resultados de las fases finales.
        // Usa los IDs de los equipos (ej: 'murphy', 'juv_venadense', 'la_banda').
        const finalsConfig = {
            // Usa los IDs de los equipos definidos abajo (en teamsData o externalTeamsData)
            championA: 'campeon_a_placeholder', // Poner ID del Campeón A aquí
            championB: 'campeon_b_placeholder', // Poner ID del Campeón B aquí

            // Final de Categoría C (Solo se activa si Apertura y Clausura tienen ganadores distintos)
            finalC: {
                played: false,  // Cambiar a true si ya se jugó
                winnerId: null, // ID del ganador
                score: null     // Resultado (ej: '2 - 1')
            },

            // Semifinal (Ganador C vs Campeón B)
            semifinal: {
                played: false,
                winnerId: null,
                score: null
            },

            // Gran Final (Ganador Semifinal vs Campeón A)
            grandFinal: {
                played: false,
                winnerId: null,
                score: null
            }
        };

        // ================= EQUIPOS EXTERNOS (A y B) =================
        // Agrega aquí los equipos de la A y la B que no están en la C
        const externalTeamsData = [
            { id: 'campeon_a_placeholder', name: 'Campeón A (Nombre)', logo: 'https://placehold.co/100x100/e50914/fff?text=A' },
            { id: 'campeon_b_placeholder', name: 'Campeón B (Nombre)', logo: 'https://placehold.co/100x100/333/fff?text=B' },
            // Puedes agregar más equipos aquí si es necesario:
            // { id: 'otro_equipo', name: 'Nombre Equipo', logo: 'ruta/imagen.png' }
        ];

        // ================= HELPER PARA DETALLES DE PARTIDOS (SOLO PACÍFICO) =================
        /**
         * Crea el HTML de detalles simplificado para Pacífico
         * @param {Array} goals - [{player: "Nombre", goals: N}, ...]
         * @param {Array} cards - [{player: "Nombre", type: "amarilla"/"roja"}, ...]
         */
        function createPacificoDetails(goals = [], cards = []) {
            let html = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-top: 5px;">';
            
            // Columna Goleadores
            html += '<div><div style="color: var(--accent-red); font-weight: bold; font-size: 0.8rem; margin-bottom: 5px; text-transform: uppercase;">Goles</div>';
            if (goals && goals.length > 0) {
                goals.forEach(g => {
                    // Repite el icono de pelota según la cantidad de goles
                    const pelotas = '⚽'.repeat(g.goals || 1);
                    html += `<div style="font-size: 0.85rem; margin-bottom: 3px; color: #ddd; display: flex; align-items: center; gap: 5px;">
                                <span>${g.player}</span> <span style="font-size: 0.7rem;">${pelotas}</span>
                             </div>`;
                });
            } else {
                html += '<div style="color: #666; font-size: 0.8rem;">-</div>';
            }
            html += '</div>';

            // Columna Tarjetas
            html += '<div><div style="color: var(--accent-yellow); font-weight: bold; font-size: 0.8rem; margin-bottom: 5px; text-transform: uppercase;">Amonestados</div>';
            if (cards && cards.length > 0) {
                cards.forEach(c => {
                    const icono = c.type === 'roja' ? '🟥' : '🟨';
                    html += `<div style="font-size: 0.85rem; margin-bottom: 3px; color: #ddd; display: flex; align-items: center; gap: 5px;">
                                <span>${c.player}</span> <span>${icono}</span>
                             </div>`;
                });
            } else {
                html += '<div style="color: #666; font-size: 0.8rem;">-</div>';
            }
            html += '</div></div>';

            return html;
        }

        // ================= FIXTURE COMPLETO =================
        const fixtureData = [
            {
                round: 1,
                matches: [
                    { home: 'Nicassio', away: 'Los Resa', court: 6, turn: 1, date: '24/01', time: '15:00', homeScore: 4, awayScore: 1, played: true },
                    { home: 'Cup Athletic', away: 'Schmol Alineaciones', court: 6, turn: 2, date: '24/01', time: '17:00', homeScore: 3, awayScore: 2, played: true },
                    { 
                        home: 'Juv. Venadense', away: 'Pacífico F.C', court: 7, turn: 2, date: '24/01', time: '17:00', 
                        homeScore: 1, awayScore: 3, played: true,
                        // FECHA 1: DATOS REALES
                        details: createPacificoDetails(
                            [
                                { player: "Federico Martínez", goals: 1 },
                                { player: "Juan Molinari", goals: 1 },
                                { player: "Samuel Garay", goals: 1 }
                            ],
                            [
                                //{ player: "Javier Bilicich", type: "amarilla" },
                                { player: "Santiago Quinteros", type: "amarilla" }
                            ]
                        )
                    },
                    { home: 'Construshop', away: 'Murphy F.C', court: 8, turn: 2, date: '24/01', time: '17:00', homeScore: 4, awayScore: 1, played: true },
                    { home: 'La Banda FC', away: 'Flamingo F.C', court: 4, turn: 1, date: '24/01', time: '15:00', homeScore: 6, awayScore: 3, played: true },
                    { home: 'Sport Blak', away: 'Sportivo Peñarol', court: 5, turn: 1, date: '24/01', time: '15:00', homeScore: 2, awayScore: 1, played: true }
                ]
            },
            {
                round: 2,
                matches: [
                    { home: 'Nicassio', away: 'Schmol Alineaciones', court: 1, turn: 1, date: '31/01', time: '15:00', homeScore: 6, awayScore: 1, played: true },
                    { 
                        home: 'Cup Athletic', away: 'Pacífico F.C', court: 7, turn: 1, date: '31/01', time: '15:00', 
                        homeScore: 1, awayScore: 1, played: true,
                        details: createPacificoDetails(
                            [
                                { player: "Samuel Garay (P)", goals: 1 }
                            ],
                            [
                                { player: "Javier Bilicich", type: "roja" },
                                { player: "Juan Molinari", type: "amarilla" },
                                { player: "Samuel Garay", type: "amarilla" },
                                { player: "Federico Martínez", type: "roja" }
                            ]
                        ) 
                    },
                    { home: 'Juv. Venadense', away: 'Murphy F.C', court: 8, turn: 1, date: '31/01', time: '15:00', homeScore: 3, awayScore: 0, played: true },
                    { home: 'Construshop', away: 'Flamingo F.C', court: 2, turn: 2, date: '31/01', time: '17:00', homeScore: 1, awayScore: 0, played: true },
                    { home: 'La Banda FC', away: 'Sportivo Peñarol', court: 5, turn: 2, date: '31/01', time: '17:00', homeScore: 4, awayScore: 0, played: true },
                    { home: 'Sport Blak', away: 'Los Resa', court: 6, turn: 2, date: '31/01', time: '17:00', homeScore: 2, awayScore: 2, played: true }
                ]
            },
            {
                round: 3,
                matches: [
                    { 
                        home: 'Nicassio', away: 'Pacífico F.C', court: 6, turn: 1, date: '07/02', time: '15:00', 
                        homeScore: 0, awayScore: 0, played: false,
                        details: createPacificoDetails([], []) 
                    },
                    { home: 'Cup Athletic', away: 'Murphy F.C', court: 2, turn: 2, date: '07/02', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Juv. Venadense', away: 'Flamingo F.C', court: 7, turn: 2, date: '07/02', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Construshop', away: 'Sportivo Peñarol', court: 3, turn: 1, date: '07/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'La Banda FC', away: 'Los Resa', court: 5, turn: 1, date: '07/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Sport Blak', away: 'Schmol Alineaciones', court: 1, turn: 2, date: '07/02', time: '17:00', homeScore: 0, awayScore: 0, played: false }
                ]
            },
            {
                round: 4,
                matches: [
                    { home: 'Nicassio', away: 'Murphy F.C', court: 3, turn: 1, date: '14/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Cup Athletic', away: 'Flamingo F.C', court: 4, turn: 1, date: '14/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Juv. Venadense', away: 'Sportivo Peñarol', court: 7, turn: 1, date: '14/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Construshop', away: 'Los Resa', court: 1, turn: 2, date: '14/02', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'La Banda FC', away: 'Schmol Alineaciones', court: 2, turn: 2, date: '14/02', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { 
                        home: 'Sport Blak', away: 'Pacífico F.C', court: 8, turn: 2, date: '14/02', time: '17:00', 
                        homeScore: 0, awayScore: 0, played: false,
                        details: createPacificoDetails([], []) 
                    }
                ]
            },
            {
                round: 5,
                matches: [
                    { home: 'Nicassio', away: 'Flamingo F.C', court: 1, turn: 1, date: '21/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Cup Athletic', away: 'Sportivo Peñarol', court: 6, turn: 1, date: '21/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Juv. Venadense', away: 'Los Resa', court: 8, turn: 1, date: '21/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Construshop', away: 'Schmol Alineaciones', court: 3, turn: 2, date: '21/02', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { 
                        home: 'La Banda FC', away: 'Pacífico F.C', court: 4, turn: 2, date: '21/02', time: '17:00', 
                        homeScore: 0, awayScore: 0, played: false,
                        details: createPacificoDetails([], []) 
                    },
                    { home: 'Sport Blak', away: 'Murphy F.C', court: 7, turn: 2, date: '21/02', time: '17:00', homeScore: 0, awayScore: 0, played: false }
                ]
            },
            {
                round: 6,
                matches: [
                    { home: 'Nicassio', away: 'Sportivo Peñarol', court: 1, turn: 1, date: '28/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Cup Athletic', away: 'Los Resa', court: 7, turn: 1, date: '28/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Juv. Venadense', away: 'Schmol Alineaciones', court: 8, turn: 1, date: '28/02', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { 
                        home: 'Construshop', away: 'Pacífico F.C', court: 4, turn: 2, date: '28/02', time: '17:00', 
                        homeScore: 0, awayScore: 0, played: false,
                        details: createPacificoDetails([], []) 
                    },
                    { home: 'La Banda FC', away: 'Murphy F.C', court: 5, turn: 2, date: '28/02', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Sport Blak', away: 'Flamingo F.C', court: 6, turn: 2, date: '28/02', time: '17:00', homeScore: 0, awayScore: 0, played: false }
                ]
            },
            {
                round: 7,
                matches: [
                    { home: 'Nicassio', away: 'Sport Blak', court: 5, turn: 2, date: '07/03', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Cup Athletic', away: 'Construshop', court: 6, turn: 2, date: '07/03', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Juv. Venadense', away: 'La Banda FC', court: 7, turn: 2, date: '07/03', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Sportivo Peñarol', away: 'Los Resa', court: 2, turn: 1, date: '07/03', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { 
                        home: 'Flamingo F.C', away: 'Pacífico F.C', court: 3, turn: 1, date: '07/03', time: '15:00', 
                        homeScore: 0, awayScore: 0, played: false,
                        details: createPacificoDetails([], []) 
                    },
                    { home: 'Murphy F.C', away: 'Schmol Alineaciones', court: 4, turn: 1, date: '07/03', time: '15:00', homeScore: 0, awayScore: 0, played: false }
                ]
            },
            {
                round: 8,
                matches: [
                    { home: 'Nicassio', away: 'La Banda FC', court: 6, turn: 1, date: '14/03', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Cup Athletic', away: 'Juv. Venadense', court: 7, turn: 1, date: '14/03', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Construshop', away: 'Sport Blak', court: 8, turn: 1, date: '14/03', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Sportivo Peñarol', away: 'Schmol Alineaciones', court: 2, turn: 2, date: '14/03', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Flamingo F.C', away: 'Murphy F.C', court: 3, turn: 2, date: '14/03', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { 
                        home: 'Pacífico F.C', away: 'Los Resa', court: 5, turn: 2, date: '14/03', time: '17:00', 
                        homeScore: 0, awayScore: 0, played: false,
                        details: createPacificoDetails([], []) 
                    }
                ]
            },
            {
                round: 9,
                matches: [
                    { home: 'Nicassio', away: 'Construshop', court: 4, turn: 1, date: '21/03', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Cup Athletic', away: 'La Banda FC', court: 7, turn: 2, date: '21/03', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Juv. Venadense', away: 'Sport Blak', court: 8, turn: 2, date: '21/03', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { 
                        home: 'Sportivo Peñarol', away: 'Pacífico F.C', court: 2, turn: 1, date: '21/03', time: '15:00', 
                        homeScore: 0, awayScore: 0, played: false,
                        details: createPacificoDetails([], []) 
                    },
                    { home: 'Flamingo F.C', away: 'Schmol Alineaciones', court: 6, turn: 1, date: '21/03', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Murphy F.C', away: 'Los Resa', court: 1, turn: 2, date: '21/03', time: '17:00', homeScore: 0, awayScore: 0, played: false }
                ]
            },
            {
                round: 10,
                matches: [
                    { home: 'Nicassio', away: 'Juv. Venadense', court: 7, turn: 1, date: '28/03', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Cup Athletic', away: 'Sport Blak', court: 5, turn: 2, date: '28/03', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'La Banda FC', away: 'Construshop', court: 6, turn: 2, date: '28/03', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Sportivo Peñarol', away: 'Murphy F.C', court: 1, turn: 1, date: '28/03', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Flamingo F.C', away: 'Los Resa', court: 2, turn: 1, date: '28/03', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { 
                        home: 'Schmol Alineaciones', away: 'Pacífico F.C', court: 4, turn: 2, date: '28/03', time: '17:00', 
                        homeScore: 0, awayScore: 0, played: false, 
                        details: createPacificoDetails([], []) 
                    }
                ]
            },
            {
                round: 11,
                matches: [
                    { home: 'Nicassio', away: 'Cup Athletic', court: 2, turn: 1, date: '04/04', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Juv. Venadense', away: 'Construshop', court: 3, turn: 1, date: '04/04', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'La Banda FC', away: 'Sport Blak', court: 7, turn: 1, date: '04/04', time: '15:00', homeScore: 0, awayScore: 0, played: false },
                    { home: 'Sportivo Peñarol', away: 'Flamingo F.C', court: 1, turn: 2, date: '04/04', time: '17:00', homeScore: 0, awayScore: 0, played: false },
                    { 
                        home: 'Murphy F.C', away: 'Pacífico F.C', court: 6, turn: 2, date: '04/04', time: '17:00', 
                        homeScore: 0, awayScore: 0, played: false,
                        details: createPacificoDetails([], []) 
                    },
                    { home: 'Schmol Alineaciones', away: 'Los Resa', court: 8, turn: 2, date: '04/04', time: '17:00', homeScore: 0, awayScore: 0, played: false }
                ]
            }

        ];

        // ================= JUGADORES =================
        const playersData = [
            { name: "Alexis Silva", teamId: "pacifico", goals: 0, yellow: 3, red: 2, img: "imagen/jugadores/alexis_silva.png", suspensionMatches: 0 },
            { name: "Tomás Quinteros", teamId: "pacifico", goals: 0, yellow: 3, red: 0, img: "imagen/jugadores/tomas_quinteros.png" },
            { name: "Cristian Dulcich", teamId: "pacifico", goals: 0, yellow: 3, red: 0, img: "imagen/jugadores/cristian_dulcich.png", suspensionMatches: 0 },
            { name: "Nicolás Miño", teamId: "pacifico", goals: 0, yellow: 2, red: 0, img: "imagen/jugadores/nicolas_mino.png", suspensionMatches: 0 },
            { name: "Juan Molinari", teamId: "pacifico", goals: 1, yellow: 1, red: 0, img: "imagen/jugadores/juan_molinari.png", suspensionMatches: 0 },
            { name: "Samuel Garay", teamId: "pacifico", goals: 2, yellow: 1, red: 0, img: "imagen/jugadores/samuel_garay.png", suspensionMatches: 0 },
            { name: "Gabriel Romanutti", teamId: "pacifico", goals: 0, yellow: 1, red: 1, img: "imagen/jugadores/gabi_romanutti.png", suspensionMatches: 0 },
            { name: "Federico Martinez", teamId: "pacifico", goals: 1, yellow: 1, red: 1, img: "imagen/jugadores/federico_martinez.png",suspensionMatches: 1 },
            { name: "Javier Bilicich", teamId: "pacifico", goals: 0, yellow: 0, red: 1, img: "imagen/jugadores/javier_bilicich.png", suspensionMatches: 2 },
            { name: "Agustín Alvarez", teamId: "pacifico", goals: 0, yellow: 1, red: 0, img: "imagen/jugadores/agustin_alvarez.png", suspensionMatches: 0 },
            { name: "Tobias Fresco", teamId: "pacifico", goals: 0, yellow: 1, red: 0, img: "imagen/jugadores/tobias_fresco.png", suspensionMatches: 0 },
            { name: "Santiago Quinteros", teamId: "pacifico", goals: 0, yellow: 1, red: 0, img: "imagen/jugadores/santiago_quinteros.png" },
            // Ejemplos añadidos para demostración de las nuevas tablas
           // { name: "Lucas Pérez", teamId: "murphy", goals: 1, yellow: 3, red: 0, img: "imagen/jugadores/default.png", suspensionMatches: 1 },
            { name: "Bernardo Giordano", teamId: "pacifico", goals: 0, yellow: 0, red: 0, img: "imagen/jugadores/bernardo_giordano.png", injuryStatus: "Desgarro Muscular"  }

        ];

        // ================= LOGICA =================
        let clausuraStandings = [];
        let annualStandings = [];

        // Funciones definimos primero para evitar ReferenceErrors
        function formatDG(val) {
            if (val > 0) return `<span class="dg-pos">+${val}</span>`;
            if (val < 0) return `<span class="dg-neg">${val}</span>`;
            return `<span class="dg-neu">${val}</span>`;
        }

        // Helper para buscar equipos en ambas listas (C y Externos)
        function findTeamById(id) {
            if (!id) return null;
            // Busca primero en los de la C, luego en los externos
            return teamsData.find(t => t.id === id) || externalTeamsData.find(t => t.id === id);
        }

        // Helper para obtener el nombre corto de un equipo si existe, o el normal
        function getShortName(fullName) {
            const team = teamsData.find(t => t.name === fullName);
            return team && team.shortName ? team.shortName : fullName;
        }

        function createMatchCard(m, roundNum, idx) {
            const isPac = (m.home === 'Pacífico F.C' || m.away === 'Pacífico F.C');
            const detailId = `det-${roundNum}-${idx}`;
            const clickAttr = isPac ? `onclick="toggleDetails('${detailId}')"` : '';
            const intClass = isPac ? 'interactive-team' : '';

            const dateDisplay = (m.date && m.time) ? `${m.date} - ${m.time}` : 'A Confirmar';

            // Usamos nombres cortos para que entre bien en movil
            const homeName = getShortName(m.home);
            const awayName = getShortName(m.away);

            return `<div class="match-card">
                <div class="match-meta">
                    <span>Cancha ${m.court}</span>
                    <span class="meta-date">${dateDisplay}</span>
                    <span>Turno ${m.turn}</span>
                </div>
                <div class="team-name team-home ${m.home === 'Pacífico F.C' ? intClass : ''}" ${m.home === 'Pacífico F.C' ? clickAttr : ''}>
                    ${homeName} ${getTeamLogoFixture(m.home)}
                </div>
                <div class="score-box">${m.played ? m.homeScore + '-' + m.awayScore : 'VS'}</div>
                <div class="team-name team-away ${m.away === 'Pacífico F.C' ? intClass : ''}" ${m.away === 'Pacífico F.C' ? clickAttr : ''}>
                        ${getTeamLogoFixture(m.away)} ${awayName}
                </div>
                <div id="${detailId}" class="match-details">${m.details || 'Sin datos.'}</div>
            </div>`;
        }

        function toggleFullFixture() {
            const container = document.getElementById('full-fixture-container');
            const icon = document.getElementById('fixture-toggle-icon');
            if (container.style.display === "none") {
                container.style.display = "block";
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                container.style.display = "none";
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }

        function renderFixture() {
            const nextContainer = document.getElementById('next-match-container');
            const fullContainer = document.getElementById('full-fixture-container');

            nextContainer.innerHTML = '';
            fullContainer.innerHTML = '';

            const nextRound = fixtureData.find(r => r.round === currentFixtureRound);
            if (nextRound) {
                let nextHtml = `<div class="fixture-date-header"><h4>Fecha ${nextRound.round}</h4><div class="date-line"></div></div>`;
                nextRound.matches.forEach((m, i) => {
                    nextHtml += createMatchCard(m, nextRound.round, i);
                });
                nextContainer.innerHTML = nextHtml;
            } else {
                nextContainer.innerHTML = '<p style="text-align:center; color:#888;">No hay fecha programada.</p>';
            }

            fixtureData.forEach(round => {
                if (round.matches && round.matches.length > 0) {
                    let html = `<div class="fixture-date-header"><h4>Fecha ${round.round}</h4><div class="date-line"></div></div>`;
                    round.matches.forEach((m, i) => {
                        html += createMatchCard(m, round.round, i);
                    });
                    fullContainer.innerHTML += html;
                }
            });
        }

        function openTeamDetails(teamId) {
            const team = teamsData.find(t => t.id === teamId);
            if (!team) return;

            const clausura = clausuraStandings.find(t => t.id === teamId).clausura;
            const annual = annualStandings.find(t => t.id === teamId).annual;

            const profileHtml = `
                <img src="${team.logo}" class="team-profile-logo" onerror="this.src='${FALLBACK_IMG}';">
                <div class="team-profile-name">${team.name}</div>
                <div class="team-stats-box">
                    <div class="ts-item"><span class="ts-val">${clausura.pts}</span><span class="ts-label">Clausura</span></div>
                    <div class="ts-item"><span class="ts-val">${annual.pts}</span><span class="ts-label">Anual</span></div>
                </div>
            `;
            document.getElementById('panel-profile').innerHTML = profileHtml;

            let matchesHtml = '';
            fixtureData.forEach(round => {
                const match = round.matches.find(m => m.home === team.name || m.away === team.name);
                if (match) {
                    const isHome = match.home === team.name;
                    const rivalName = isHome ? match.away : match.home;
                    // Usar nombre completo
                    const rivalDisplayName = rivalName;

                    const rival = teamsData.find(t => t.name === rivalName);
                    const rivalLogo = rival ? rival.logo : FALLBACK_IMG;

                    let resultDisplay = '-';
                    if (match.played) {
                        const myScore = isHome ? match.homeScore : match.awayScore;
                        const rivalScore = isHome ? match.awayScore : match.homeScore;
                        // Color logic logic: Green if win, Red if loss, Gray if draw
                        let colorClass = '#E0E0E0'; // Empate
                        if (myScore > rivalScore) colorClass = '#00E676'; // Gano
                        if (myScore < rivalScore) colorClass = '#FF1744'; // Perdio

                        // Badge con ancho 100% dentro de la celda de 70px
                        resultDisplay = `<span class="history-result" style="background:${colorClass}; color:#000;">${myScore} - ${rivalScore}</span>`;
                    } else {
                        resultDisplay = `<span style="font-size:0.7rem; color:#888;">${match.time || '-'}</span>`;
                    }

                    matchesHtml += `
                        <tr>
                            <td style="text-align:center"><span style="color:#666; font-weight:bold;">${round.round}</span></td>
                            <td>
                                <div class="history-rival">
                                    <img src="${rivalLogo}" onerror="this.src='${FALLBACK_IMG}';">
                                    <span>${rivalDisplayName}</span>
                                </div>
                            </td>
                            <td style="text-align:right;">${resultDisplay}</td>
                        </tr>
                    `;
                }
            });
            document.getElementById('panel-matches').innerHTML = matchesHtml;
            document.getElementById('team-detail-panel').classList.add('active');
        }

        function closeTeamDetails() {
            document.getElementById('team-detail-panel').classList.remove('active');
        }

        function renderTables() {
            const header = `<thead><tr><th>#</th><th>Equipo</th><th>PTS</th><th>J</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>DG</th></tr></thead><tbody>`;

            let aperturaSorted = [...teamsData].sort((a, b) => (b.apertura.pts - a.apertura.pts) || ((b.apertura.gf - b.apertura.gc) - (a.apertura.gf - a.apertura.gc)));
            let htmlAp = header;
            aperturaSorted.forEach((t, i) => {
                if (t.apertura.j > 0) {
                    const dg = t.apertura.gf - t.apertura.gc;
                    htmlAp += `<tr class="${t.isAperturaChamp ? 'gold-row' : ''}" onclick="openTeamDetails('${t.id}')">
                        <td>${i + 1}</td>
                        <td><img src="${t.logo}" class="team-logo-mini" onerror="this.src='${FALLBACK_IMG}';">${t.name}</td>
                        <td style="color:var(--accent-red); font-weight:900; font-size:1rem;">${t.apertura.pts}</td>
                        <td>${t.apertura.j}</td><td>${t.apertura.g}</td><td>${t.apertura.e}</td><td>${t.apertura.p}</td>
                        <td>${t.apertura.gf}</td><td>${formatDG(dg)}</td>
                    </tr>`;
                }
            });
            document.getElementById('apertura-table-body').innerHTML = htmlAp + '</tbody>';

            let htmlC = header;
            clausuraStandings.forEach((t, i) => {
                const dg = t.clausura.gf - t.clausura.gc;
                htmlC += `<tr onclick="openTeamDetails('${t.id}')">
                    <td>${i + 1}</td>
                    <td><img src="${t.logo}" class="team-logo-mini" onerror="this.src='${FALLBACK_IMG}';">${t.name}</td>
                    <td style="color:var(--accent-red); font-weight:900; font-size:1rem;">${t.clausura.pts}</td>
                    <td>${t.clausura.j}</td><td>${t.clausura.g}</td><td>${t.clausura.e}</td><td>${t.clausura.p}</td>
                    <td>${t.clausura.gf}</td><td>${formatDG(dg)}</td>
                </tr>`;
            });
            document.getElementById('clausura-table-body').innerHTML = htmlC + '</tbody>';

            let htmlA = header;
            annualStandings.forEach((t, i) => {
                const dg = t.annual.gf - t.annual.gc;
                htmlA += `<tr class="${t.isAperturaChamp ? 'gold-row' : ''}" onclick="openTeamDetails('${t.id}')">
                    <td>${i + 1}</td>
                    <td><img src="${t.logo}" class="team-logo-mini" onerror="this.src='${FALLBACK_IMG}';">${t.name}${t.isAperturaChamp ? ' <i class="fas fa-crown" style="font-size:0.8rem; margin-left:5px;"></i>' : ''}</td>
                    <td style="color:var(--accent-red); font-weight:900; font-size:1rem;">${t.annual.pts}</td>
                    <td>${t.annual.j}</td><td>${t.annual.g}</td><td>${t.annual.e}</td><td>${t.annual.p}</td>
                    <td>${t.annual.gf}</td><td>${formatDG(dg)}</td>
                </tr>`;
            });
            document.getElementById('annual-table-body').innerHTML = htmlA + '</tbody>';
        }

        function checkChampionCelebration() {
            // Verifica si hay un ganador definido en la Gran Final
            if (finalsConfig.grandFinal.played && finalsConfig.grandFinal.winnerId) {
                const champ = findTeamById(finalsConfig.grandFinal.winnerId);
                if (champ) {
                    const overlay = document.getElementById('champion-overlay');
                    const winnerName = document.getElementById('winner-display-name');
                    const winnerLogo = document.getElementById('winner-display-logo');
                    winnerName.innerText = champ.name;
                    winnerLogo.innerHTML = `<img src="${champ.logo}" class="winner-logo" onerror="this.src='${FALLBACK_IMG}';">`;
                    overlay.classList.add('active');
                    startConfetti();
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        setTimeout(() => { overlay.classList.remove('active'); stopConfetti(); }, 500);
                    }, 10000);
                }
            } else if (tournamentChampionId) {
                // FALLBACK: Mantener compatibilidad con variable antigua si se usa
                const champ = findTeamById(tournamentChampionId);
                if (champ) {
                    const overlay = document.getElementById('champion-overlay');
                    const winnerName = document.getElementById('winner-display-name');
                    const winnerLogo = document.getElementById('winner-display-logo');
                    winnerName.innerText = champ.name;
                    winnerLogo.innerHTML = `<img src="${champ.logo}" class="winner-logo" onerror="this.src='${FALLBACK_IMG}';">`;
                    overlay.classList.add('active');
                    startCelebration();
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        setTimeout(() => { overlay.classList.remove('active'); stopCelebration(); }, 500);
                    }, 10000);
                }
            } else if (tournamentChampionId) {
                // FALLBACK: Mantener compatibilidad con variable antigua si se usa
                const champ = findTeamById(tournamentChampionId);
                if (champ) {
                    const overlay = document.getElementById('champion-overlay');
                    const winnerName = document.getElementById('winner-display-name');
                    const winnerLogo = document.getElementById('winner-display-logo');
                    winnerName.innerText = champ.name;
                    winnerLogo.innerHTML = `<img src="${champ.logo}" class="winner-logo" onerror="this.src='${FALLBACK_IMG}';">`;
                    overlay.classList.add('active');
                    startCelebration();
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        setTimeout(() => { overlay.classList.remove('active'); stopCelebration(); }, 500);
                    }, 10000);
                }
            }
        }

        // === SISTEMA DE CELEBRACIÓN (Confeti Dorado + Fuegos Artificiales) ===
        let animationFrameId;
        
        function startCelebration() {
            const canvas = document.getElementById('confetti');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            let confettiParticles = [];
            let fireworks = [];
            
            const confettiColors = ['#FFD700', '#FDB931', '#FFFFE0', '#B8860B', '#FFFFFF']; // Tonos dorados
            
            class ConfettiParticle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height - canvas.height;
                    this.size = Math.random() * 12 + 6;
                    this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
                    this.speedY = Math.random() * 3 + 2;
                    this.speedX = Math.random() * 4 - 2;
                    this.rotation = Math.random() * 360;
                    this.rotationSpeed = Math.random() * 10 - 5;
                }
                update() {
                    this.y += this.speedY;
                    this.x += this.speedX;
                    this.rotation += this.rotationSpeed;
                    if (this.y > canvas.height) {
                        this.y = -20;
                        this.x = Math.random() * canvas.width;
                    }
                }
                draw() {
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.rotation * Math.PI / 180);
                    ctx.fillStyle = this.color;
                    ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2); // Forma rectangular (serpentina)
                    ctx.restore();
                }
            }

            class Firework {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height;
                    this.targetY = Math.random() * (canvas.height * 0.5) + canvas.height * 0.1;
                    this.speed = Math.random() * 3 + 8;
                    this.radius = 3;
                    this.hue = Math.random() * 360;
                    this.exploded = false;
                    this.particles = [];
                }
                update() {
                    if (!this.exploded) {
                        this.y -= this.speed;
                        this.speed *= 0.98; // Resistencia aire
                        if (this.speed <= 1 || this.y <= this.targetY) {
                            this.explode();
                        }
                    } else {
                        for (let i = this.particles.length - 1; i >= 0; i--) {
                            this.particles[i].update();
                            if (this.particles[i].alpha <= 0) this.particles.splice(i, 1);
                        }
                    }
                }
                explode() {
                    this.exploded = true;
                    // Explosion circular
                    for (let i = 0; i < 80; i++) {
                        this.particles.push(new FireworkParticle(this.x, this.y, this.hue));
                    }
                }
                draw() {
                    if (!this.exploded) {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                        ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
                        ctx.fill();
                    } else {
                        this.particles.forEach(p => p.draw());
                    }
                }
            }

            class FireworkParticle {
                constructor(x, y, hue) {
                    this.x = x;
                    this.y = y;
                    this.hue = hue;
                    const angle = Math.random() * Math.PI * 2;
                    const velocity = Math.random() * 4 + 1;
                    this.vx = Math.cos(angle) * velocity;
                    this.vy = Math.sin(angle) * velocity;
                    this.alpha = 1;
                    this.decay = Math.random() * 0.02 + 0.01;
                    this.gravity = 0.05;
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vy += this.gravity;
                    this.vx *= 0.95;
                    this.vy *= 0.95;
                    this.alpha -= this.decay;
                }
                draw() {
                    ctx.save();
                    ctx.globalAlpha = this.alpha;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
                    ctx.fill();
                    ctx.restore();
                }
            }

            // Inicializar confetis
            for (let i = 0; i < 150; i++) confettiParticles.push(new ConfettiParticle());

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar

                // Actualizar y dibujar confeti
                confettiParticles.forEach(p => { p.update(); p.draw(); });

                // Generar fuegos artificiales aleatorios
                if (Math.random() < 0.03) { // Probabilidad de lanzamiento
                    fireworks.push(new Firework());
                }
                
                // Actualizar y dibujar fuegos artificiales
                for (let i = fireworks.length - 1; i >= 0; i--) {
                    fireworks[i].update();
                    fireworks[i].draw();
                    if (fireworks[i].exploded && fireworks[i].particles.length === 0) {
                       fireworks.splice(i, 1);
                    }
                }

                animationFrameId = requestAnimationFrame(animate);
            }
            animate();
        }

        function stopCelebration() { 
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            const canvas = document.getElementById('confetti');
            if(canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        // Función MANUAL para probar (accesible desde consola: manualCelebrationTest())
        window.manualCelebrationTest = function() {
            // Simulamos un equipo campeón cualquiera
            const testChamp = { name: "EQUIPO PRUEBA", logo: FALLBACK_IMG }; 
            
            const overlay = document.getElementById('champion-overlay');
            const winnerName = document.getElementById('winner-display-name');
            const winnerLogo = document.getElementById('winner-display-logo');
            
            winnerName.innerText = testChamp.name;
            winnerLogo.innerHTML = `<img src="${testChamp.logo}" class="winner-logo" onerror="this.src='${FALLBACK_IMG}';">`;
            
            overlay.classList.add('active');
            overlay.style.opacity = '1';
            
            startCelebration();
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => { overlay.classList.remove('active'); stopCelebration(); }, 500);
            }, 10000); // 10 segundos
            
            console.log("¡Celebración de prueba iniciada! Durará 10s.");
        };

        function calculateStandings() {
            clausuraStandings = teamsData.map(t => ({ ...t, clausura: { j: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 } }));
            fixtureData.forEach(round => {
                if (round.matches) {
                    round.matches.forEach(match => {
                        if (match.played) {
                            updateStats(match.home, match.homeScore, match.awayScore);
                            updateStats(match.away, match.awayScore, match.homeScore);
                        }
                    });
                }
            });
            clausuraStandings.sort((a, b) => (b.clausura.pts - a.clausura.pts) || ((b.clausura.gf - b.clausura.gc) - (a.clausura.gf - a.clausura.gc)));
            annualStandings = clausuraStandings.map(t => ({
                ...t,
                annual: {
                    j: t.apertura.j + t.clausura.j,
                    g: t.apertura.g + t.clausura.g,
                    e: t.apertura.e + t.clausura.e,
                    p: t.apertura.p + t.clausura.p,
                    gf: t.apertura.gf + t.clausura.gf,
                    gc: t.apertura.gc + t.clausura.gc,
                    pts: t.apertura.pts + t.clausura.pts
                }
            }));
            annualStandings.sort((a, b) => (b.annual.pts - a.annual.pts) || ((b.annual.gf - b.annual.gc) - (a.annual.gf - a.annual.gc)));
            renderTables();
        }

        function updateStats(teamName, gf, gc) {
            let team = clausuraStandings.find(t => t.name === teamName);
            if (team) {
                team.clausura.j++; team.clausura.gf += gf; team.clausura.gc += gc;
                if (gf > gc) { team.clausura.g++; team.clausura.pts += 3; }
                else if (gf === gc) { team.clausura.e++; team.clausura.pts += 1; }
                else { team.clausura.p++; }
            }
        }

        function renderFinals() {
            const container = document.getElementById('finals-container');
            const aperturaWinner = teamsData.find(t => t.isAperturaChamp);

            // Asegurarse de que clausuraStandings esté calculado
            if (!clausuraStandings || clausuraStandings.length === 0) return;
            const clausuraLeader = clausuraStandings[0];

            let html = '';

            // --- 1. DEFINICIÓN CATEGORÍA C ---
            let winnerC = null; // Objeto del equipo ganador de la C
            let winnerC_Label = "Campeón C";

            // Lógica automática: Si Apertura != ClausuraLeader, hay final
            const needsFinalC = (clausuraLeader && clausuraLeader.id !== aperturaWinner.id);

            if (needsFinalC) {
                const fC = finalsConfig.finalC;
                const matchTitle = "Definición Categoría C";

                let scoreDisplay = '<div class="bracket-vs">VS</div>';
                if (fC.played && fC.score) {
                    scoreDisplay = `<div class="bracket-vs" style="font-size:1.5rem; color:#fff">${fC.score}</div>
                                    <div style="font-size:0.7rem; color:#888; text-align:center">FINALIZADO</div>`;
                }

                // Render Final C Bracket
                html += `
                <div class="bracket-card">
                    <div class="bracket-header">${matchTitle}</div>
                    <div class="bracket-match">
                        <div class="bracket-team">
                            <img src="${aperturaWinner.logo}" onerror="this.src='${FALLBACK_IMG}';">
                            <span>${aperturaWinner.name}</span>
                            <span class="badge badge-gold">Apertura</span>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center">
                            ${scoreDisplay}
                        </div>
                        <div class="bracket-team">
                            <img src="${clausuraLeader.logo}" onerror="this.src='${FALLBACK_IMG}';">
                            <span>${clausuraLeader.name}</span>
                            <span class="badge" style="background:var(--accent-green); color:#000">Clausura</span>
                        </div>
                    </div>
                </div>
                <div class="connector-line"></div>`;

                if (fC.played && fC.winnerId) {
                    winnerC = findTeamById(fC.winnerId);
                } else {
                    winnerC_Label = "Ganador C";
                }
            } else {
                // Ganó ambos
                winnerC = aperturaWinner;
            }

            // --- 2. SEMIFINAL (Winner C vs Champion B) ---
            const champB = findTeamById(finalsConfig.championB);
            const semi = finalsConfig.semifinal;
            let winnerSemi = null;

            // Preparar visualización
            const team1Html = winnerC
                ? `<img src="${winnerC.logo}" onerror="this.src='${FALLBACK_IMG}';"><span>${winnerC.name}</span>`
                : `<i class="fas fa-question-circle" style="font-size:2rem; color:#555"></i><span>${winnerC_Label}</span>`;

            const team2Html = champB
                ? `<img src="${champB.logo}" onerror="this.src='${FALLBACK_IMG}';"><span>${champB.name}</span>`
                : `<i class="fas fa-shield-alt" style="font-size:2rem; color:#555"></i><span>Campeón B</span>`;

            let semiScore = '<div class="bracket-vs">VS</div>';
            if (semi.played && semi.score) {
                semiScore = `<div class="bracket-vs" style="font-size:1.5rem; color:#fff">${semi.score}</div>
                             <div style="font-size:0.7rem; color:#888; text-align:center">FINALIZADO</div>`;
            }

            html += `
            <div class="bracket-card">
                <div class="bracket-header">Semifinal de Ascenso</div>
                <div class="bracket-match">
                    <div class="bracket-team">${team1Html}</div>
                    <div style="display:flex; flex-direction:column; align-items:center">
                        ${semiScore}
                    </div>
                    <div class="bracket-team">${team2Html}</div>
                </div>
            </div>
            <div class="connector-line"></div>`;

            if (semi.played && semi.winnerId) {
                winnerSemi = findTeamById(semi.winnerId);
            }

            // --- 3. GRAN FINAL (Winner Semi vs Champion A) ---
            const champA = findTeamById(finalsConfig.championA);
            const finalG = finalsConfig.grandFinal;

            const semiWinnerHtml = winnerSemi
                ? `<img src="${winnerSemi.logo}" onerror="this.src='${FALLBACK_IMG}';"><span>${winnerSemi.name}</span>`
                : `<i class="fas fa-trophy" style="font-size:2.5rem; color:#555"></i><span>Finalista</span>`;

            const finalRivalHtml = champA
                ? `<img src="${champA.logo}" onerror="this.src='${FALLBACK_IMG}';"><span>${champA.name}</span>`
                : `<i class="fas fa-crown" style="font-size:2.5rem; color:#fff"></i><span>Campeón A</span>`;

            let finalScore = '<div class="bracket-vs" style="color:var(--accent-red)">VS</div>';
            if (finalG.played && finalG.score) {
                finalScore = `<div class="bracket-vs" style="font-size:2rem; color:var(--accent-red)">${finalG.score}</div>
                             <div style="font-size:0.7rem; color:#888; text-align:center">FINAL</div>`;
            }

            html += `
            <div class="bracket-card gold-border">
                <div class="bracket-header final"><i class="fas fa-star"></i> GRAN FINAL <i class="fas fa-star"></i></div>
                <div class="bracket-match">
                    <div class="bracket-team">${semiWinnerHtml}</div>
                    <div style="display:flex; flex-direction:column; align-items:center">
                        ${finalScore}
                    </div>
                    <div class="bracket-team">${finalRivalHtml}</div>
                </div>
            </div>`;

            container.innerHTML = html;
        }

        // --- ESTADISTICAS NUEVAS (TABLAS MEJORADAS MOVIL) ---
        function renderStats() {
            const goles = [...playersData].sort((a, b) => b.goals - a.goals);
            let htmlG = '';
            goles.forEach((p, index) => {
                if (p.goals > 0) {
                    let t = teamsData.find(x => x.id === p.teamId);
                    // Nombre + Equipo en la misma celda con nombre de equipo pequeño
                    htmlG += `
                    <tr>
                        <td style="color: #666; font-weight: bold;">${index + 1}</td>
                        <td>
                            <div class="player-cell-content">
                                <img src="${p.img}" class="player-table-img" onerror="this.src='${FALLBACK_USER}';">
                                <div class="player-info-box">
                                    <span class="player-table-name">${p.name}</span>
                                    <span class="player-table-team">${t ? t.name : '-'}</span>
                                </div>
                            </div>
                        </td>
                        <td style="font-weight: 900; color: #fff; font-size: 1.2rem; text-align: right; padding-right: 15px;">${p.goals}</td>
                    </tr>`;
                }
            });
            document.getElementById('goleadores-list').innerHTML = htmlG;

            let htmlT = '';
            playersData.forEach((p, index) => {
                if (p.yellow > 0 || p.red > 0) {
                    let t = teamsData.find(x => x.id === p.teamId);
                    let badges = '';
                    if (p.yellow > 0) badges += `<span class="card-icon yellow-card"><i class="fas fa-square"></i> ${p.yellow}</span>`;
                    if (p.red > 0) badges += `<span class="card-icon red-card"><i class="fas fa-square"></i> ${p.red}</span>`;

                    htmlT += `
                    <tr>
                        <td style="color: #666; font-weight: bold;">${index + 1}</td>
                        <td>
                            <div class="player-cell-content">
                                <img src="${p.img}" class="player-table-img" onerror="this.src='${FALLBACK_USER}';">
                                <div class="player-info-box">
                                    <span class="player-table-name">${p.name}</span>
                                    <span class="player-table-team">${t ? t.name : '-'}</span>
                                </div>
                            </div>
                        </td>
                        <td style="text-align: right; padding-right: 15px;">${badges}</td>
                    </tr>`;
                }
            });
            document.getElementById('tarjetas-list').innerHTML = htmlT;

            // --- NUEVAS TABLAS: SANCIONES Y BAJAS ---

            // Render Suspensiones
            const suspendidos = playersData.filter(p => p.suspensionMatches && p.suspensionMatches > 0).sort((a,b) => b.suspensionMatches - a.suspensionMatches);
            let htmlS = '';
            suspendidos.forEach((p, index) => {
                let t = teamsData.find(x => x.id === p.teamId);
                htmlS += `
                <tr>
                    <td style="color: #666; font-weight: bold;">${index + 1}</td>
                    <td>
                        <div class="player-cell-content">
                            <img src="${p.img}" class="player-table-img" onerror="this.src='${FALLBACK_USER}';">
                            <div class="player-info-box">
                                <span class="player-table-name">${p.name}</span>
                                <span class="player-table-team">${t ? t.name : '-'}</span>
                            </div>
                        </div>
                    </td>
                    <td style="text-align: right; font-weight:bold; color:var(--accent-red); padding-right: 15px;">${p.suspensionMatches} F.</td>
                </tr>`;
            });
            document.getElementById('suspensiones-list').innerHTML = htmlS || '<tr><td colspan="3" style="text-align:center; padding:15px; color:#666;">Sin suspensiones activas.</td></tr>';

            // Render Bajas
            const bajas = playersData.filter(p => p.injuryStatus).sort((a,b) => a.name.localeCompare(b.name));
            let htmlB = '';
            bajas.forEach((p, index) => {
                let t = teamsData.find(x => x.id === p.teamId);
                htmlB += `
                <tr>
                    <td style="color: #666; font-weight: bold;">${index + 1}</td>
                    <td>
                        <div class="player-cell-content">
                            <img src="${p.img}" class="player-table-img" onerror="this.src='${FALLBACK_USER}';">
                            <div class="player-info-box">
                                <span class="player-table-name">${p.name}</span>
                                <span class="player-table-team">${t ? t.name : '-'}</span>
                            </div>
                        </div>
                    </td>
                    <td style="text-align: right; color:#aaa; font-size:0.8rem; padding-right: 15px;">${p.injuryStatus}</td>
                </tr>`;
            });
            document.getElementById('bajas-list').innerHTML = htmlB || '<tr><td colspan="3" style="text-align:center; padding:15px; color:#666;">Sin bajas reportadas.</td></tr>';
        }

        function getTeamLogoFixture(name) {
            let t = teamsData.find(x => x.name === name);
            return t ? `<img src="${t.logo}" class="team-logo-fixture" onerror="this.src='${FALLBACK_IMG}';">` : '';
        }

        function toggleDetails(id) { let el = document.getElementById(id); if (el) el.classList.toggle('show'); }
        function switchCategory(cat) {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            const clickedBtn = Array.from(document.querySelectorAll('.cat-btn')).find(b => b.textContent.includes(cat === 'copa' ? 'COPA' : 'CAT ' + cat));
            if (clickedBtn) clickedBtn.classList.add('active');
            document.querySelectorAll('.section-container').forEach(s => s.classList.remove('active'));
            document.getElementById('cat-' + cat).classList.add('active');
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            if (cat === 'C') document.querySelectorAll('.nav-item')[0].classList.add('active');
            if (cat === 'copa') document.querySelectorAll('.nav-item')[2].classList.add('active');
        }
        function showSubSection(id, element) {
            document.querySelectorAll('.sub-link').forEach(l => l.classList.remove('active'));
            if (element) element.classList.add('active');
            document.querySelectorAll('.c-subsection').forEach(d => d.style.display = 'none');
            document.getElementById(id).style.display = 'block';
        }

        // ================= INICIALIZACIÓN =================
        calculateStandings();
        renderFixture();
        renderStats();
        renderFinals();
        checkChampionCelebration();
