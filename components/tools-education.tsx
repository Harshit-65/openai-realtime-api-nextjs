"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useTranslations } from "@/components/translations-context"


export function ToolsEducation() {
  const { t } = useTranslations();

  const AVAILABLE_TOOLS = [
    {
      name: t('tools.availableTools.copyFn.name'),
      description: t('tools.availableTools.copyFn.description'),
    },
    {
      name: t('tools.availableTools.getTime.name'),
      description: t('tools.availableTools.getTime.description'),
    },
    {
      name: t('tools.availableTools.themeSwitcher.name'),
      description: t('tools.availableTools.themeSwitcher.description'),
    },
    {
      name: t('tools.availableTools.partyMode.name'),
      description: t('tools.availableTools.partyMode.description'),
    },
    {
      name: t('tools.availableTools.neonGlow.name') || "Neon Glow Effect",
      description: t('tools.availableTools.neonGlow.description') || "Say \"Show neon glow\" for a futuristic energy particle animation!",
    },
    {
      name: t('tools.availableTools.weather.name') || "Weather",
      description: t('tools.availableTools.weather.description') || "Say \"What's the weather in [city]?\" to get real-time weather information.",
    },
    {
      name: t('tools.availableTools.launchWebsite.name'),
      description: t('tools.availableTools.launchWebsite.description'),
    },
    {
      name: t('tools.availableTools.scrapeWebsite.name'),
      description: t('tools.availableTools.scrapeWebsite.description'),
    },
    {
      name: t('tools.availableTools.showForm.name') || "Show Form",
      description: t('tools.availableTools.showForm.description') || "Displays a form to collect your name, age, and email.",
    },
    {
      name: t('tools.availableTools.getLastForm.name') || "Last Form Submission",
      description: t('tools.availableTools.getLastForm.description') || "Shows when you last submitted the form.",
    },
  ] as const;

  return (
    <div className="w-full max-w-lg mt-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="tools">
          <AccordionTrigger>{t('tools.availableTools.title')}</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                {AVAILABLE_TOOLS.map((tool) => (
                  <TableRow key={tool.name}>
                    <TableCell className="font-medium">{tool.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tool.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
} 