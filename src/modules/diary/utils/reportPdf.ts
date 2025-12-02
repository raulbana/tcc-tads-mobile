import RNPrint from 'react-native-print';
import {ReportDTO, CalendarDayDTO} from '../../../types/diary';

const amountLabel: Record<string, string> = {
  LOW: 'Pouco (até 100ml)',
  MEDIUM: 'Médio (100-300ml)',
  HIGH: 'Alto (acima de 300ml)',
};

const formatDay = (day: CalendarDayDTO) => {
  const urinations = day.urinationData
    .map(u => {
      const amountText = amountLabel[u.amount] || u.amount;
      return `${u.time} - ${amountText}${u.leakage ? ' (escape)' : ''}`;
    })
    .join('<br/>');
  return `
    <tr>
      <td>${day.date}</td>
      <td>${day.leakageLevel}</td>
      <td>${day.completedExercises}</td>
      <td>${day.eventsCount}</td>
      <td>${urinations}</td>
    </tr>
  `;
};

export async function printReportPdf(report: ReportDTO) {
  const rows = report.history.map(formatDay).join('');

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, Roboto, Arial, sans-serif; padding: 16px; }
          h1 { font-size: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border: 1px solid #ddd; padding: 8px; font-size: 12px; }
          th { background: #f5f5f5; text-align: left; }
        </style>
      </head>
      <body>
        <h1>Relatório Miccional</h1>
        <div><strong>Gerado em:</strong> ${new Date(
          report.generatedAt,
        ).toLocaleString()}</div>
        <div><strong>Paciente:</strong> ${
          report.user.name
        } | <strong>Idade:</strong> ${
    report.user.age
  } | <strong>Gênero:</strong> ${report.user.gender}</div>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Nível de Escape</th>
              <th>Exercícios</th>
              <th>Eventos</th>
              <th>Micções</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `;

  await RNPrint.print({html});
}
