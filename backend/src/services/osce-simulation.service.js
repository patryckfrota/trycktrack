export function createSimulationService() {
  return {
    async handleCandidateAction() {
      throw new Error('Simulação OSCE com paciente ainda não ativada.');
    }
  };
}
