from html import escape
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Xin_Lin_CV_2026.pdf"

PAGE_W, PAGE_H = A4
MARGIN = 68
CONTENT_W = PAGE_W - 2 * MARGIN
DATE_W = 98
DETAIL_X = MARGIN + DATE_W
DETAIL_W = PAGE_W - MARGIN - DETAIL_X

PAPER = HexColor("#f4f2ed")
INK = HexColor("#181a18")
MUTED = HexColor("#646963")
ACCENT = HexColor("#50665f")
RULE = HexColor("#c8cac3")


def register_fonts():
    fonts = Path("C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont("CVSans", str(fonts / "arial.ttf")))
    pdfmetrics.registerFont(TTFont("CVSansBold", str(fonts / "arialbd.ttf")))
    pdfmetrics.registerFont(TTFont("CVSerif", str(fonts / "georgia.ttf")))


def paragraph_style(font="CVSans", size=8.2, leading=11.2, color=MUTED):
    return ParagraphStyle(
        name=f"{font}-{size}-{leading}",
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=0,
        spaceBefore=0,
    )


def draw_paragraph(pdf, text, x, top, width, style):
    block = Paragraph(escape(text), style)
    _, height = block.wrap(width, PAGE_H)
    block.drawOn(pdf, x, top - height)
    return top - height


def page_background(pdf):
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def footer(pdf, page_number):
    y = 42
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.45)
    pdf.line(MARGIN - 6, y + 14, PAGE_W - MARGIN + 6, y + 14)
    pdf.setFont("CVSans", 6.8)
    pdf.setFillColor(MUTED)
    pdf.drawString(MARGIN - 6, y, "XIN LIN / ACADEMIC ARTIST CV / 2026")
    pdf.drawRightString(PAGE_W - MARGIN + 6, y, str(page_number))


def section_header(pdf, title, top):
    pdf.setFillColor(INK)
    pdf.setFont("CVSerif", 14.2)
    pdf.drawString(MARGIN, top, title)
    rule_y = top - 12
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.5)
    pdf.line(MARGIN, rule_y, PAGE_W - MARGIN, rule_y)
    return rule_y - 14


def timeline_entry(pdf, top, date, title, detail, note=None, role=None, gap=16):
    date_style = paragraph_style(size=7.5, leading=9.5)
    title_style = paragraph_style(font="CVSerif", size=10.1, leading=12.5, color=INK)
    detail_style = paragraph_style(size=7.7, leading=10.2)
    note_style = paragraph_style(size=7.35, leading=9.8, color=MUTED)

    date_bottom = draw_paragraph(pdf, date.upper(), MARGIN, top, DATE_W - 10, date_style)
    current = draw_paragraph(pdf, title, DETAIL_X, top, DETAIL_W, title_style) - 3
    if role:
        role_x = DETAIL_X + pdfmetrics.stringWidth(title, "CVSerif", 10.1) + 9
        pdf.setFillColor(ACCENT)
        pdf.setFont("CVSansBold", 5.8)
        pdf.drawString(role_x, top - 8.7, role.upper())
    current = draw_paragraph(pdf, detail, DETAIL_X, current, DETAIL_W, detail_style)
    if note:
        current -= 4
        current = draw_paragraph(pdf, note, DETAIL_X, current, DETAIL_W, note_style)
    return min(date_bottom, current) - gap


def methods_table(pdf, top):
    methods = [
        ("PHYSIOLOGICAL SENSING", "EEG, GSR, biosignal mapping", "Translating bodily processes into responsive visual, sonic and tactile material."),
        ("INTERACTIVE SYSTEMS", "p5.js, HTML/CSS, Python, Flutter, Arduino, TouchDesigner, Unity", "Building real-time interfaces and participatory audiovisual environments."),
        ("MULTISENSORY INSTALLATION", "Projection, sound, touch, kinetic devices", "Composing cross-modal encounters through image, sound, movement and material response."),
        ("MATERIAL AND FABRICATION", "Sculpture, ceramics, glass, Blender, Onshape, 3D printing, mould making", "Connecting material research, digital fabrication and spatial prototyping."),
        ("VISUAL INQUIRY", "Chinese painting, oil painting, moving image, editorial design", "Using image-making as a method for observation, narration and cross-media research."),
    ]
    col_1 = MARGIN
    col_2 = MARGIN + 112
    col_3 = MARGIN + 273
    row_widths = (106, 151, PAGE_W - MARGIN - col_3)
    label_style = paragraph_style(font="CVSansBold", size=7.6, leading=9.5, color=INK)
    body_style = paragraph_style(size=7.6, leading=10.3)

    for label, tools, description in methods:
        h1 = Paragraph(escape(label), label_style)
        h2 = Paragraph(escape(tools), body_style)
        h3 = Paragraph(escape(description), body_style)
        heights = [item.wrap(width, PAGE_H)[1] for item, width in zip((h1, h2, h3), row_widths)]
        row_height = max(max(heights) + 16, 33)

        h1.drawOn(pdf, col_1, top - heights[0] - 7)
        h2.drawOn(pdf, col_2, top - heights[1] - 7)
        h3.drawOn(pdf, col_3, top - heights[2] - 7)
        top -= row_height
        pdf.setStrokeColor(RULE)
        pdf.setLineWidth(0.4)
        pdf.line(MARGIN, top, PAGE_W - MARGIN, top)

    return top - 18


def draw_header(pdf):
    pdf.setFillColor(INK)
    pdf.setFont("CVSerif", 31)
    pdf.drawCentredString(PAGE_W / 2, 774, "XIN LIN")

    pdf.setFillColor(ACCENT)
    pdf.setFont("CVSans", 8.6)
    pdf.drawString(MARGIN, 744, "ARTIST / CREATIVE TECHNOLOGIST")

    pdf.setFillColor(MUTED)
    pdf.setFont("CVSans", 7.6)
    pdf.drawString(MARGIN, 727, "Multidisciplinary art / Interactive installations / Physiological sensing")
    pdf.drawString(MARGIN, 714, "miaomiaolin05@gmail.com   |   Instagram: @sanmu_00")


def create_cv():
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4)
    pdf.setTitle("Xin Lin - Academic Artist CV 2026")
    pdf.setSubject("Artist and Creative Technologist Curriculum Vitae")
    pdf.setAuthor("Xin Lin")

    page_background(pdf)
    draw_header(pdf)

    top = section_header(pdf, "EDUCATION", 670)
    top = timeline_entry(
        pdf,
        top,
        "Sep 2024 - Sep 2026",
        "Universitat Polit\u00e8cnica de Val\u00e8ncia",
        "Master's Program in Visual Arts and Multimedia",
        "Thesis: DMC - Dynamic Multisensory Canvas. Modular artistic audiovisual soft-interface for multisensory interaction.",
    )
    top = timeline_entry(
        pdf,
        top,
        "Mar 2026 - Aug 2026",
        "Keio University",
        "International Exchange Program, Department of Mechanical Engineering, MikiLab",
    )
    top = timeline_entry(
        pdf,
        top,
        "Sep 2023 - Jun 2024",
        "Central Academy of Fine Arts",
        "International Exchange Program in Sculpture",
    )
    top = timeline_entry(
        pdf,
        top,
        "Sep 2020 - Jul 2024",
        "Universitat Polit\u00e8cnica de Val\u00e8ncia",
        "Bachelor's Program in Fine Arts",
        "Thesis: Bridge of Nonverbal Communication: An Experimental Poetic Audiovisual Narrative Controlled by EEG Signals.",
        gap=22,
    )

    exhibitions = [
        ("Jul 2026", "Breath Between Us", "MikiLab Exhibition 2026, Raiosha Gallery, Keio University, Yokohama, Japan", "Curatorial"),
        ("Jan 2026", "Queerxata Art Workshop", "Centre del Carme Cultura Contempor\u00e0nia, Valencia, Spain", "Curatorial"),
        ("Oct 2025", "Volumens 2025 International Art Festival", "Centre del Carme Cultura Contempor\u00e0nia, Valencia, Spain", None),
        ("Feb 2025", "Spanish Radio Art 101st Anniversary Exhibition", "SGAE, Valencia, Spain", None),
        ("Jun 2024", "Pengci, Ceramic Works Exhibition", "Corridor Gallery, Department of Sculpture, Central Academy of Fine Arts", None),
        ("Jun 2024", "Liu Guang Li Ying, Glass Works Exhibition", "Corridor Gallery, Department of Sculpture, Central Academy of Fine Arts", None),
        ("Sep 2023", "Yi Wu Yi Wu, Materials Exhibition", "Corridor Gallery, Department of Sculpture, Central Academy of Fine Arts", None),
        ("Jun 2023", "Roent, Casting Works Exhibition", "Ribarroja Municipal Art Gallery, Spain", None),
        ("Feb 2023", "15th MundoArti International Virtual Gallery Exhibition", "MundoArti platform", None),
    ]

    top = section_header(pdf, "EXHIBITIONS AND CURATORIAL EXPERIENCE", top)
    for date, title, detail, role in exhibitions[:5]:
        top = timeline_entry(pdf, top, date, title, detail, role=role, gap=14)

    footer(pdf, 1)
    pdf.showPage()

    page_background(pdf)
    top = section_header(pdf, "EXHIBITIONS AND CURATORIAL EXPERIENCE / CONTINUED", 778)
    for date, title, detail, role in exhibitions[5:]:
        top = timeline_entry(pdf, top, date, title, detail, role=role, gap=15)

    top = section_header(pdf, "RECOGNITION", top)
    top = timeline_entry(
        pdf,
        top,
        "2022 - 2023",
        "Gold Award, Chinese Visual Arts Annual",
        "Awarded for El Mundo.",
        gap=22,
    )

    top = section_header(pdf, "RESEARCH METHODS", top)
    top = methods_table(pdf, top)

    footer(pdf, 2)
    pdf.save()


if __name__ == "__main__":
    create_cv()
