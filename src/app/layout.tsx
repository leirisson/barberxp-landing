import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BarberXP — Sistema para Barbearias com Gamificação",
  description:
    "Gerencie sua barbearia, fidelize clientes com pontos e recompensas, controle financeiro e agendamentos em um só lugar.",
  openGraph: {
    title: "BarberXP — Sistema para Barbearias",
    description:
      "Agendamento inteligente, controle financeiro e gamificação de clientes para barbearias modernas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
