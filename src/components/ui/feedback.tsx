import { AlertCircle, Ban, FileQuestion, Inbox, LockKeyhole, SearchX } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./Button";
import { Heading, Text } from "./typography";
import { cn } from "../../lib/cn";
interface StateProps { title: string; description?: string; icon?: ReactNode; actionLabel?: string; onAction?: () => void; className?: string; }
export function EmptyState({ title, description, icon = <Inbox/>, actionLabel, onAction, className }: StateProps) { return <div className={cn("flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center", className)}><div className="mb-4 grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">{icon}</div><Heading variant="subtitle">{title}</Heading>{description && <Text variant="muted" className="mt-2 max-w-md">{description}</Text>}{actionLabel && <Button className="mt-5" onClick={onAction}>{actionLabel}</Button>}</div>; }
export function ErrorState(props: Omit<StateProps, "icon">) { return <EmptyState icon={<AlertCircle className="text-danger"/>} {...props}/>; }
export function NoData(props: Partial<StateProps>) { return <EmptyState title="No data" description="There is no data to display yet." icon={<SearchX/>} {...props}/>; }
export function NotFound(props: Partial<StateProps>) { return <EmptyState title="Page not found" description="The requested page does not exist." icon={<FileQuestion/>} {...props}/>; }
export function Forbidden(props: Partial<StateProps>) { return <EmptyState title="Access forbidden" description="You do not have permission to access this resource." icon={<Ban/>} {...props}/>; }
export function Unauthorized(props: Partial<StateProps>) { return <EmptyState title="Authentication required" description="Sign in to continue." icon={<LockKeyhole/>} {...props}/>; }
