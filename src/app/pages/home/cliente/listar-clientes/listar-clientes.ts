import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClienteSalvar } from '../../../../core/models/cliente/cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClienteService } from '../../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ComfirmDeleteDialog } from '../../../../components/layout/comfirm-delete-dialog/comfirm-delete-dialog';
import { ConfirmPedidoDialog } from '../../../../components/layout/confirm-pedido-dialog/confirm-pedido-dialog';

@Component({
  selector: 'app-listar-clientes',
  standalone: false,
  templateUrl: './listar-clientes.html',
  styleUrl: './listar-clientes.css'
})
export class ListarClientes implements OnInit, OnDestroy, AfterViewInit{

  filtro!: string;
  displayedColumns: string[] = ['nome', 'documento', 'email', 'telefone', 'cep', 'actions'];
  dataSource = new MatTableDataSource<ClienteSalvar>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  private destroy$ = new Subject<void>();

  constructor(private clienteService: ClienteService, private toastr: ToastrService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  ngAfterViewInit(): void {
    this.configurarDataSource();
    this.configurarSorting();
  }

  private configurarDataSource(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  private configurarSorting(): void {
    if (this.sort) {
      this.sort.sortChange
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          if (this.paginator) this.paginator.firstPage();
        });
    }
  }

  carregarClientes(): void {
    this.clienteService.buscarClientes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (clientes) => {
          this.dataSource.data = clientes;
          this.configurarDataSource();
        },
        error: (err) => {
          this.toastr.error('Erro ao carregar clientes');
        }
      });
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();

    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  alterar(clienteId: string) {
    console.log("Aqui: ", clienteId)
    this.router.navigate(['cliente/alterar-cliente', clienteId]);
  }

  deletar(clienteId: string, clienteNome: string) {
    const dialogRef = this.dialog.open(ComfirmDeleteDialog, {
      width: '450px',
      autoFocus: false,
      data: { userName: clienteNome },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.deletar(clienteId).subscribe({
          next: (res) => {
            this.toastr.success(res.message);
            this.carregarClientes();
          }
        });
      }
    });
  }

  registrar() {
    this.router.navigate(['cliente/cadastrar-cliente']);
  }

  novoPedido(clienteId: string, clienteNome: string) {
  const dialogRef = this.dialog.open(ConfirmPedidoDialog, {
     width: '450px',
      autoFocus: false,
      data: { userName: clienteNome },
      disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.router.navigate(['pedido/cadastrar-pedido', clienteId]);
    }
  });
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
